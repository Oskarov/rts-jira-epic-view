import React, {useEffect} from 'react'


const App = (): JSX.Element => {

    useEffect(() => {
        var newURL = chrome.runtime.getURL("pages/main/index.html");
        chrome.tabs.create({url: newURL});
    }, [])

    return <div></div>
}

export default App
