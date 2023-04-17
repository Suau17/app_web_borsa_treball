import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetUser } from "../services/getUser";
export  function DetailsUser() {
    let [profile, setProfile] = useState([])
    const { id } = useParams();
    useEffect(() => {
        GetUser(id).then(profile => setProfile(profile))       
    }, [])
    console.log('PROFILEEE')
   
    let html;
    if(profile.user){
      const data = profile.alumno[0].curriculum.data
         html = (
            <>
            <h1>{profile.user.name}</h1>
            <ul>
                <li>Email: {profile.user.email}</li>
                <button><a target="_blank" href={`${import.meta.env.VITE_URL}/app/curriculum/${profile.alumno[0]._id}`} download>CURRICULUM</a> </button>
            </ul>
            </>
        )
    } else {
         html = (
            <>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    return html
}
