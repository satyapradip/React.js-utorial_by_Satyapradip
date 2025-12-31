import React from 'react'

const App = () => {

  // function btnclicked(){
  //   console.log(`Button is clicked`)
  // }

  function inputChanging(val) {
    console.log(val)
  }

  return (
    <div>
      <h1>Hello guys</h1>

      <button  onClick={() => {
        console.log("Button clicked")
      }} >Change User</button>

      <input onChange={function(elem) {
        inputChanging(elem.target.value)
      }} type="text"  placeholder='' />

      
    </div>
  )
}

export default App
