import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0], // pq sempre é um jogo de dois valores no display
    current: 0 // current significa atual. Ou seja, essa variável irá dizer se estou trabalhando atualmente com valor do índice zero ou indice 1
}

export default class Calculator extends Component {

    state = { ...initialState } //atribui a state todas as variáveis de initialState

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) { // inicio operação com valores no index 0. Ao iniciar uma nova operação, meu index passa a ser 1 e clearDisplay é acionado, pois novos números irão ser colocados em uma tela limpa
            this.setState({ operation, current: 1, clearDisplay: true })
        } else { // lógica para concluir operação. Ou seja, current 1
            const equals = operation === "="
            const currentOperation = this.state.operation  // aqui estou usando uma variável que recebe a operação a partir do index 1. Se chegou aqui é pq já tem operação setada, que agora é a currentOperation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // sempre quando uma operação for setada, resultado será armazenado no zero
            } catch (e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0  // já que index 0 recebeu o resutado, index 1 passa a ser zero

            this.setState({
                displayValue: values[0], // resultado da operação é armazenado no displayValue
                operation: equals ? null : operation, // se for equals não tem operação, ai retorna null, caso contrário é add nova operação
                current: equals ? 0 : 1, // se usuário aperto em equals, usuário continuará mexendo com index 0. Caso contrário estará mexendo no index 1
                clearDisplay: !equals,
                values // guardando valores em values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { // se colocar um ponto no display, mas já consta um ponto no display. Regra para evitar ter mais de um ponto na calculadora
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay === true // para evitar os zero a eesquerda, pq 00001 é a mesma coisa que 1

        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + n // valor atual + valor que estou digitando

        this.setState({ displayValue, clearDisplay: false }) // após digitar um valor, o clearDisplay estará false

        if (n != '.') {
            const i = this.state.current // pegui index do valor que stou alterando
            const newValue = parseFloat(displayValue) // transformei meu valor do display em float
            const values = [...this.state.values] //clonando meu array em outro array
            values[i] = newValue // armazenei meu valor, que pode estar no index 0 ou 1
            this.setState({ values }) // substitui meu novo array dentro de state
            console.log(values)
        }
        // importante ressaltar que as variáveis criadas fora e initialState fora colocadas com mesmo nome para facilitar o processo
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}
