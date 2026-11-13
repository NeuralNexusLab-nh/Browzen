import {parseDocument,getInnerHTML} from './html-parser-vendor.js';
// Pure-data HTML parsing: unlike a live Document, this cannot load subresources.
export function splitDocument(source,{scriptsEnabled=true}={}){
 const document=parseDocument(String(source),{decodeEntities:true});if(scriptsEnabled){const prune=node=>{if(!node.children)return;node.children=node.children.filter(child=>child.name!=='noscript');for(const child of node.children)prune(child);};prune(document);}
 const html=document.children.find(n=>n.name==='html')||document,head=html.children.find(n=>n.name==='head'),body=html.children.find(n=>n.name==='body');
 const headNames=new Set(['base','link','meta','title','style','script','template','noscript']),headNodes=head?[...head.children]:[],bodyNodes=[];let inBody=!!head;
 for(const node of html.children){if(node===head||node.type==='directive')continue;if(node===body){inBody=true;bodyNodes.push(...node.children);continue;}if(!head&&!inBody&&headNames.has(node.name))headNodes.push(node);else if(node.type==='text'&&!node.data.trim()){if(inBody)bodyNodes.push(node);}else{inBody=true;bodyNodes.push(node);}}
 const attrs=node=>Object.entries(node?.attribs||{});return {head:getInnerHTML({children:headNodes}),body:getInnerHTML({children:bodyNodes}),documentAttrs:{html:html===document?[]:attrs(html),body:attrs(body)}};
}
