import React from 'react';
import Form from '../Components/Form/Form.js';
import content from "../ProductList.json";


const params = {
    title: "Подобрать вклад",
    deposit_info: content,
    checkboxes:
        [
            {id : "adding", text : "Хочу пополнять"},
            {id : "removing", text : "Хочу снимать"},
            {id : "online", text : "Открою онлайн"}],
};


function App() {
  return (
      <Form { ...params } />
  );
}

export default App;
