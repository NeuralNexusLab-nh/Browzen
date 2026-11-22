import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const {build}=await import(process.env.BROWZEN_ESBUILD_MODULE||'esbuild');
const guard=(await readFile(new URL('../runtime/privacy-guard.js',import.meta.url),'utf8')).replace(/\r\n/g,'\n');
const result=await build({entryPoints:[fileURLToPath(new URL('./frame-content-entry.js',import.meta.url))],define:{__BROWZEN_WORKER_GUARD__:JSON.stringify(guard)},bundle:true,platform:'browser',format:'iife',write:false});
await writeFile(new URL('./frame-bundle.js',import.meta.url),guard+'\n'+result.outputFiles[0].text);
