import React, {useEffect, useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from "codemirror"
const client = require('./client')

const RealTimeEditor = () => {

    useEffect(() => {
        console.log(document.getElementById('codemirror'))
        const editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), 
        {
            lineNumbers: true,
            keyMap: 'sublime',
            theme: 'material-ocean',
            mode: 'javascript'
        })

        editor.on('change', (instance, changes) => {
            console.log('smth has changed on this page. I am ' + client.collabSocket.id)
            const { origin } = changes
            if (origin != 'setValue') {
                client.collabSocket.emit('CODE_CHANGED', client.collabSocket.id, instance.getValue())
                console.log('emit change signal ' + instance.getValue())
            }
        })

        client.collabSocket.on('CODE_CHANGED', (roomId, code) => {
            console.log('smth has changed on the other end!' + code)
            editor.setValue(code)
        })
    }, [])
    return (
        <>
            <textarea id="codemirror" />
        </>
    )
}

export default RealTimeEditor