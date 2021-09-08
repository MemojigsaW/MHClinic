export function checkLogin(){
    const token = localStorage.getItem("MHtoken");
    if (token===null){
        throw new Error("Missing token");
    }
    return fetch('/api/user/validate',
        {method:'GET',
            headers:{'x-auth-token':token}
        })
}

export async function checkSetLogIn(action){
    try{
        const res = await checkLogin();
        if (!res.ok) {
            action(false);
            return null;
        }
        action(true);
        return await res.json();
    }catch (e) {
        console.log(e);
        action(false);
        return null
    }
}


export function getUser(uid){
    const path = '/api/user/'+uid
    return fetch(path, {method:'GET'})
}

export async function setGetUser(uid, setUser){
    try{
        const res = await getUser(uid);
        if (!res.ok){
            console.log("get user response failed");
            return null
        }
        const user = await res.json();
        setUser(user);
        return user;
    }catch (e) {
        console.log(e);
        return null
    }
}

export async function getAvatar(oid){
    try{
        const path = '/api/user/avatar/'+oid
        const res = await fetch(path,
            {method:'GET'});
        if (!res.ok){
            return null;
        }
        const data = await res.blob();
        return data
    }catch (e) {
        console.log(e);
        return null
    }
}

export async function getMentalScore(uid){
    try{
        const path = '/api/mental/'+uid
        const res = await fetch(path, {method:'GET'});
        if (!res.ok){
            console.log("fetch mental score failed");
            return null
        }
        const data = await res.json();
        return {
            anxiety:data.anxiety,
            depression:data.depression,
            panic:data.panic
        }
    }catch (e) {
        console.log(e);
        return null
    }
}