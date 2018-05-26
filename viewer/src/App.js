import React, { Component } from 'react';
import data from './data.json';
import './App.css';

const typeMap = {
  text: ({ children, node }) => (<span>{children || (node && node.text)}</span>),
  h1: ({ children, node }) => (<h1>{children || (node && node.text)}</h1>),
  h2: ({ children, node }) => (<h2>{children || (node && node.text)}</h2>),
  h3: ({ children, node }) => (<h3>{children || (node && node.text)}</h3>),
  h4: ({ children, node }) => (<h4>{children || (node && node.text)}</h4>),
  h5: ({ children, node }) => (<h5>{children || (node && node.text)}</h5>),
  h6: ({ children, node }) => (<h6>{children || (node && node.text)}</h6>),
  a: ({ children, node }) => (
    <a href={node && node.href}>{children || (node && node.text)}</a>
  ),
  p: ({ children, node }) => (<p>{children || (node && node.text)}</p>),
  code: ({ children, node }) => (<code>{children || (node && node.text)}</code>),
  pre: ({ children, node }) => (<pre>{children || (node && node.text)}</pre>),
  ul: ({ children, node }) => (<ul>{children || (node && node.text)}</ul>),
  li: ({ children, node }) => (<li>{children || (node && node.text)}</li>),
  em: ({ children, node }) => (<em>{children || (node && node.text)}</em>),
  strong: ({ children, node }) => (<strong>{children || (node && node.text)}</strong>),
  b: ({ children, node }) => (<b>{children || (node && node.text)}</b>),
  img: ({ children, node }) => (<img src={node.src} alt='' />)
}

const Viewer = ({ tree }) => {
  const Type = typeMap[tree.type] || typeMap.text

  if (tree.childs) {
    return (<Type node={tree}><Wrap>{tree.childs}</Wrap></Type>)
  }
  return <Type node={tree}/>
}

const Wrap = ({ children }) => (
  <React.Fragment>
    {children.map((elem, key) => (<Viewer tree={elem} key={key} />))}
  </React.Fragment>
)

class App extends Component {
  render() {
    const tree = data

    return (
      <div className="App">
        <div className="content">
          <Wrap>{tree}</Wrap>
        </div>
      </div>
    );
  }
}

export default App;
