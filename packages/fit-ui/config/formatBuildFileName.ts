export interface PreRenderedAsset {
	name: string ;
	source: string | Uint8Array;
	type: 'asset';
}

export interface PreRenderedChunk {
	exports: string[];
	facadeModuleId: string | null;
	isDynamicEntry: boolean;
	isEntry: boolean;
	isImplicitEntry: boolean;
	moduleIds: string[];
	name: string;
	type: 'chunk';
}

export const formatChunkFile = (chunks:PreRenderedChunk): string => {
  let fileName = chunks.name.split('.')[0];
  if (chunks.facadeModuleId) {
    fileName = chunks.facadeModuleId.split('/').pop() || '';
  }
  return `${fileName}.js`;
}

export const formatEntryFile = (chunks:PreRenderedChunk): string => {
  let fileName = chunks.name.split('.')[0];
  console.log('chunkd',chunks);
  return fileName + '.js'
}

export const formatAssetFile = (assets:PreRenderedAsset): string => {
  console.log(assets);
  let extType = assets.name.split('.')[1];
  let fileName = assets.name.split('.')[0];
  if (/\.(png|jpe?g|gif|svg)$/.test(assets.name)) {
    extType = 'images';
  }
  if (/\.([cm]?js|ts)$/.test(assets.name)) {
    extType = 'js';
  }
  if (/\.css$/.test(assets.name)) {
    extType = 'css';
  }
  // 使用[name]保留原文件名，[hash]或[hash:8]添加哈希，以确保文件名唯一
  return `${extType}/${fileName}.${extType}`;
}