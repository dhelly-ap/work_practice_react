import React from 'react';
import Form from './Form.js';
import content from "./ProductList.json";


const params = {
    title: "Подобрать вклад",
    deposit_info: content,
};

function App() {
  return (
      <Form { ...params } />
  );
}

export default App;
