import loadLanguages from 'prismjs/components/index';
import Prism from 'prismjs'
// import escapeHtml from 'escape-html';

export type CurLangType = 'vue'|'html' | 'js' | 'ts'



const lgObj = {
  vue: 'html',
  html:'html',
  js: 'javascript',
  ts: 'typescript'
}

// loadLanguages(['html','javascript','typescript'])


export function highlightCode(code:string, language:CurLangType) {
  const curLang = lgObj[language]
  const grammar = Prism.languages[curLang];
  // let escapeCode = ''

  if (!curLang || !grammar) {
    console.warn(`Prism does not support the language '${language}'.`);
    return code;
  }
 
  const highlightedCode =Prism.highlight(code, grammar, language);
  return  `<pre class="language-${language}"><code >${highlightedCode}</code></pre>`;
}

export const getTemplateContent = (code:string) => {
  const templateRegex = /<template>([\s\S]+)<\/template>/;
   const templateMatch = code.match(templateRegex);
   const templateContent = templateMatch ? templateMatch[1].trim() : '';
   return templateContent
}