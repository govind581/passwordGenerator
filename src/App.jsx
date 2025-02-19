import { useState, useEffect, useCallback, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= "0123456789"
    if (charAllowed) str+= "@#$$%&*+=~!?:;,.()[]{}<>|^_`"

    for (let i = 1; i <=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
     
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,40);
   window.navigator.clipboard.writeText(password).then(() => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
   })
  },[password] )

  useEffect(() => {
    PasswordGenerator()
  },[length, numberAllowed, charAllowed, PasswordGenerator])

return (
   <>   
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 bg-gray-700 text-orange-500'>
       <h1 className='text-center my-3 text-white '>PASSWORD GENARATOR</h1>
       <div className = 'flex shadow rounded-lg overflow-hidden mb-4'>
       <input 
       type="text"
       value = {password} 
       className = "outline-none w-full py-1 px-3"
       placeholder = "Password"
       readOnly
       ref={passwordRef}
       />
       <button
       onClick={copyPasswordToClipboard}
       className={`outline-none px-3 py-0.5 shrink-0 ${
       isCopied ? 'bg-green-500' : 'bg-blue-600'
       } text-white`}
       >
       {isCopied ? 'Copied!' : 'Copy'}
       </button>
      </div>

     <div className='flex flex-col sm:flex-row text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={40}
        value={length} 
        onChange={(e) =>{setLength(e.target.value)}}
        />
        <label>Length: {length} </label>

      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput" 
        onChange={()=>{
          setnumberAllowed((prev) => !prev);
        }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput" 
        onChange={()=>{
          setcharAllowed((prev) => !prev);
        }}
      />
      <label 
      htmlFor="characterInput">Characters</label>
      </div>

     </div>

   </div>

     
    </>
  )
}

export default App
