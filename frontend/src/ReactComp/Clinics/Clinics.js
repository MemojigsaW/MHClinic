import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

import TopBar from "../Shared/Topbar/topbar";
import SortBar from "./SortBar";

import './Clinics.css'
import SingleDisplay from "./SingleDisplay";

import {_images} from "../Shared/data/data";

function ClinicList() {

    const location = useLocation();

    const [clinics, setClinics] = useState([]);
    const [searchText, setSearchText] = useState(location.searchText || null);

    useEffect(async ()=>{
        const cliniclist = await getClinics(searchText);
        if (cliniclist){
            await attachClinicsImage(cliniclist);
            setClinics(cliniclist);
        }else{
            console.log("Clinic list is empty");
        }
    }, []);

    async function getClinics(loc=null){
        let path = '/api/clinic/';
        if (loc instanceof String || typeof loc === 'string') {
            path = path + loc;
        }

        try{
            const res = await fetch(path, {
                method:'GET'
            })

            if (!res.ok){
                console.log("Fetch Clinic failed");
                return null
            }

            const data = await res.json();
            return data;
        }catch (e) {
            console.log(e);
            return null
        }
    }

    async function attachClinicsImage(cliniclist){
        const imgPromises = cliniclist.map((element, index)=>{
            const i_path = '/api/clinic/image/'+element.view
            return fetch(i_path, {method:"GET"}).then(res=>{
                if (res.ok){
                    return res.blob();
                }else{
                    return null;
                }
            })
        });

        const result = await Promise.all(imgPromises);
        cliniclist.forEach((element,index)=>{
            let n_view;
            if (result[index]){
                n_view = URL.createObjectURL(result[index]);
            }else{
                n_view = _images.heartlogo;
            }
            element.view = n_view;
        })
    }

    async function handleSortbyUpdate(n_loc){
        const cliniclist = await getClinics(n_loc);
        if (cliniclist){
            await attachClinicsImage(cliniclist);
            setClinics(cliniclist);
            setSearchText(n_loc);
        }else{
            console.log("Clinic list is null, get clinic call failed");
        }
    }

    return (
        <>
            <TopBar/>

            <SortBar searchText={searchText} handleSortbyUpdate={handleSortbyUpdate}/>

            <div className="listwrapper">
                {clinics.map(current => (
                    <SingleDisplay data={current}/>
                ))}
            </div>
        </>
    )
}

export default ClinicList;