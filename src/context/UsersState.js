import UserContext from "./UserContext";

const UsersState = (props) => {
    
    const host = "https://inote-book.glitch.me"
    //login user

    const login=async(email, password)=>{
        const response = await fetch(`${host}/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
          });
          const json = await response.json()
          //console.log(json)
          return json
    }

    //register 
    const signup=async(name,email, password)=>{
      const response = await fetch(`${host}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email, password})
        });
        const json = await response.json()
        return json;
  }
    
  return (
    <UserContext.Provider value={{login,signup}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UsersState
