/* Support syntax highlighting to template string comments
Yeah I know, a bit weird and doesn't work in other editors 

You'd have to type /* lang * / at the beginning of a template string
to highlight the code
*/
export const glsl = (str: TemplateStringsArray) => `${str}`
