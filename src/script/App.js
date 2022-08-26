import { useState } from 'react';
import '../style/App.css';


function App() {
  const [list, setList]=useState([]);
  const [mode, setMode]=useState("MAIN");
  let content=null;

  if(mode === "MAIN"){
    list.length === 0 ? 
      content=<h2 className="list-null">아직 일정이 없습니다!</h2> 
      : content=<List list={list}></List>
  } else if(mode === "CREATE"){
    content=<form 
      onSubmit={(e)=>{
        e.preventDefault();
        let c=[...list];
        e.target.inputTitle.value ? 
          c.push({title: e.target.inputTitle.value, text: e.target.inputText.value, key: c.length+1}) 
          : alert("값이 비어있습니다.");
        setList(c);
        e.target.inputTitle.value="";
        e.target.inputText.value="";
        setMode("MAIN");
      }}>
      <p id="title">
        <input type="text" name="inputTitle" placeholder="해야 할 일을 적으세요!"/>
      </p>
      <p id="text">
        <textarea name="inputText" rows="10" cols="30" placeholder="상세 목록을 적으세요!"/>
      </p>
      <p id="buttons">
      <button
        type="button"
        onClick={()=>{
          setMode("MAIN");
        }}>
        취소
      </button>
      <input type="submit" value="확인"/>
      </p>
    </form>
  }

  return (
    <div className="body">
      <h1>TO DO LIST!!</h1>
      {content}
      <button
        onClick={()=>{
          setMode("CREATE");
        }}>
        CREATE
      </button>
    </div>
  );
}

function List(props) {
  let lis=[];
  props.list.map((element, i)=>{
    lis.push(
      <li key={i}>
        <h4>{element.title}</h4>
          <input type="checkbox"/>
      </li>
    );
  });

  return(
    <article>
      <ul className="todo-list">
        {lis}
      </ul>
    </article>
  );
}

export default App;