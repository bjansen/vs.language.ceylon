'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'Ceylon',
        name: 'ceylon',
        defaultToken: '',
        lineComment: '//',
        blockCommentStart: '/*',
        blockCommentEnd: '*/',
        // the default separators except `@$`
        wordDefinition: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        keywords: [
            'abstracts', 'actual', 'alias', 'annotation', 'assembly', 
            'assert', 'assign', 'break', 'case', 'catch', 'class', 'continue', 
            'deprecated', 'else', 'exists', 'extends', 
            'finally', 'for', 'function', 'given', 'if', 'import', 'in',
            'interface', 'is', 'let', 'literal', 'module', 'new',
            'nonempty', 'object', 'of', 'optional', 'out', 'outer', 'package', 'red', 'return',
            'satisfies', 'super', 'switch', 'tagged', 'then', 'this',
            'throw', 'try', 'value', 'void', 'while',
            
            'abstract', 'by', 'default', 'doc', 'dynamic', 'final', 'formal', 'late',
            'license', 'native', 'sealed', 'see', 'shared', 'small', 'throws', 'variable',
            
            'null', 'true', 'false' 
        ],
        operators: [
            '!', '!=', '%', '%=', '&', '&&','&&=', '&=', '*', '**', '*=', '+', '+', '++', 
            '+=', '-', '-', '--', '-=', '->', '.', '..', ':', '/', '/=', '<', '<=', '<=>', 
            '=', '==', '===', '>', '>=', '?.', '[', ']', '*', '*.', '^', '|', '|=', '||', 
            '||=', '{', '}', '~', '~='
        ],
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        digits: /\d+(_+\d+)*/,
        octaldigits: /[0-7]+(_+[0-7]+)*/,
        binarydigits: /[0-1]+(_+[0-1]+)*/,
        hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // identifiers and keywords
                [/[a-zA-Z_$][\w$]*/, { cases: { '@keywords': { token: 'keyword.$0' },
                            '@default': 'identifier' } }],
                // whitespace
                { include: '@whitespace' },
                // delimiters and operators
                [/[{}()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, { cases: { '@operators': 'delimiter',
                            '@default': '' } }],
                // @ annotations.
                [/@\s*[a-zA-Z_\$][\w\$]*/, 'annotation'],
                // numbers
                [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, 'number.float'],
                [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, 'number.float'],
                [/0[xX](@hexdigits)[Ll]?/, 'number.hex'],
                [/0(@octaldigits)[Ll]?/, 'number.octal'],
                [/0[bB](@binarydigits)[Ll]?/, 'number.binary'],
                [/(@digits)[fFdD]/, 'number.float'],
                [/(@digits)[lL]?/, 'number'],
                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],
                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string'],
                // characters
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid']
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\*\*(?!\/)/, 'comment.doc', '@javadoc'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],
            comment: [
                [/[^\/*]+/, 'comment'],
                // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
                // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
                [/\*\//, 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],
            //Identical copy of comment above, except for the addition of .doc
            javadoc: [
                [/[^\/*]+/, 'comment.doc'],
                // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
                [/\/\*/, 'comment.doc.invalid'],
                [/\*\//, 'comment.doc', '@pop'],
                [/[\/*]/, 'comment.doc']
            ],
            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
        },
    };
});
