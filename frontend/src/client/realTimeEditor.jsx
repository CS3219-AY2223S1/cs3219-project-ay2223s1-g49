import React, {useEffect, useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import { collabSocket } from './client'
import { CodeMirror } from "codemirror"

const RealTimeEditor = () => {

    console.log("AAAAAAAAA")

    useEffect(() => {
        console.log("BBBBBBBBBBB")
        const editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), 
        {
            lineNumbers: true,
            keyMap: 'sublime',
            theme: 'material-ocean',
            mode: 'javascript'
        })

        console.log("CCCCCCCC")

        // editor.on('change', (instance, changes) => {
        //     const { origin } = changes
        //     if (origin != 'setValue') {
        //         collabSocket.emit('CODE_CHANGED', collabSocket.id, instance.getValue())
        //     }
        // })

        // collabSocket.on('CODE_CHANGED', (roomId, code) => {
        //     editor.setValue(code)
        // })
    }, [])
    return (
        <>
            <textarea id="codemirror" />
        </>
    )
}

export default RealTimeEditor