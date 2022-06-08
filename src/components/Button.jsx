import React from 'react'
import './Button.css'

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button onClick={e => props.click && props.click(props.label)} className={classes}>
            {props.label}
        </button>
    )
}

//export default props => // expressão de className delimita por backtick(``), ou seja, template string. Sempre que tenho expressão chave dentro do meu jsx, lá dentro posso usar js
//<button className={`
//    button
//    ${props.operation ? 'operation' : ''} // se ${para interpolar uma variável}. Se a propriedade operation for passada para o botão, chamará className 'operation' :  caso contráiro vazio
//`}>
//  {props.label}
//</button>

// // verificação com props.click && espero receber nas propriedades do meu botão uma propriedade chamada click. O conteúdo dela será uma função