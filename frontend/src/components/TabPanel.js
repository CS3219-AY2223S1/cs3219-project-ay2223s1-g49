import React from 'react';
import '../styles/MainPage.css';

function TabPanel(props) {
    const {value, index, children} = props;
    return (
      value == index && (
        <div>
          {children}
        </div>
      )
    )
}


export default TabPanel;