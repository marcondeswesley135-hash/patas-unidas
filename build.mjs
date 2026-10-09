// ===== Build de produção do Instituto Patas Unidas =====
// Gera a pasta dist/ com HTML, CSS e JS minificados e as imagens otimizadas.
// Rodar com: npm run build

import { build } from 'esbuild';
import { minify } from 'html-minifier-terser';
import sharp from 'sharp';
import { rm, mkdir, readdir, readFile, writeFile, stat, copyFile } from 'node:fs/promises';

const DIST = 'dist';

// guarda o tamanho antes e depois de cada arquivo, para o relatório
const relatorio = [];

async function medir(origem, destino) {
    const antes = (await stat(origem)).size;
    const depois = (await stat(destino)).size;
    relatorio.push({ arquivo: origem, antes, depois });
}

// 1. limpa a pasta dist
await rm(DIST, { recursive: true, force: true });
await mkdir(`${DIST}/html`, { recursive: true });
await mkdir(`${DIST}/imagens`, { recursive: true });

// 2. CSS e JS: esbuild minifica cada arquivo
//    Os scripts NÃO são módulos (usam funções globais entre arquivos, como
//    renderizarPets e validarCampo). Por isso não usamos "bundle" nem "format":
//    assim o esbuild não renomeia as funções globais e nada quebra.
const arquivosJs = (await readdir('js')).filter((nome) => nome.endsWith('.js')).map((nome) => `js/${nome}`);

await build({
    entryPoints: ['css/estilo.css', ...arquivosJs],
    outdir: DIST,
    outbase: '.',
    minify: true,
    target: ['es2020'],
    logLevel: 'warning'
});

for (const arquivo of ['css/estilo.css', ...arquivosJs]) {
    await medir(arquivo, `${DIST}/${arquivo}`);
}

// 3. HTML: tira espaços, quebras de linha e comentários
const arquivosHtml = (await readdir('html')).filter((nome) => nome.endsWith('.html'));

for (const nome of arquivosHtml) {
    const html = await readFile(`html/${nome}`, 'utf8');
    const reduzido = await minify(html, {
        collapseWhitespace: true,
        conservativeCollapse: true, // mantém 1 espaço entre palavras e tags (ex.: "<strong>Atenção:</strong> Campanha")
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });
    await writeFile(`${DIST}/html/${nome}`, reduzido);
    await medir(`html/${nome}`, `${DIST}/html/${nome}`);
}

// 4. Imagens: cria versões WebP e AVIF (bem mais leves) ao lado das originais,
//    na própria pasta imagens/, para o <picture> do HTML funcionar também no Live Server.
//    Depois copia a pasta inteira para dist/.
const fotos = (await readdir('imagens')).filter((nome) => /\.(jpe?g|png)$/i.test(nome));

for (const nome of fotos) {
    const base = nome.replace(/\.(jpe?g|png)$/i, '');
    await sharp(`imagens/${nome}`).webp({ quality: 75 }).toFile(`imagens/${base}.webp`);
    await sharp(`imagens/${nome}`).avif({ quality: 50 }).toFile(`imagens/${base}.avif`);
    await medir(`imagens/${nome}`, `imagens/${base}.webp`);
    await medir(`imagens/${nome}`, `imagens/${base}.avif`);
}

for (const nome of await readdir('imagens')) {
    await copyFile(`imagens/${nome}`, `${DIST}/imagens/${nome}`);
}

// 5. página inicial na raiz do site, que leva para html/index.html
await writeFile(
    `${DIST}/index.html`,
    '<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=html/index.html"><title>Instituto Patas Unidas</title></head><body><a href="html/index.html">Abrir o site</a></body></html>'
);

// 6. relatório no terminal
let totalAntes = 0;
let totalDepois = 0;
console.log('\nArquivo                          Antes      Depois     Redução');
for (const item of relatorio) {
    const reducao = ((1 - item.depois / item.antes) * 100).toFixed(1);
    console.log(
        item.arquivo.padEnd(32),
        (item.antes / 1024).toFixed(1).padStart(7) + ' KB',
        (item.depois / 1024).toFixed(1).padStart(7) + ' KB',
        reducao.padStart(6) + '%'
    );
    if (!item.arquivo.startsWith('imagens/')) {
        totalAntes += item.antes;
        totalDepois += item.depois;
    }
}
console.log(
    '\nTotal HTML+CSS+JS:',
    (totalAntes / 1024).toFixed(1) + ' KB ->',
    (totalDepois / 1024).toFixed(1) + ' KB',
    '(' + ((1 - totalDepois / totalAntes) * 100).toFixed(1) + '% menor)\n'
);
