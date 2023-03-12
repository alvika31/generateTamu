import React, { useState, useEffect  } from 'react';
import { Transition } from '@headlessui/react'
import wedding from '../wedding.jpg';
import muslim from '../muslim.png'
import kristen from '../kristen.png'
import buddha from '../buddha.png'
import { IconSquareRoundedX, IconTrash, IconSend, IconBrandWhatsapp } from '@tabler/icons-react';

 function Form(){
    const [tamu, setTamu] = useState("");
    const [hasil, setHasil] = useState([]);
    const [link, setLink] = useState("");
    const [popup, setPopup] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [no, setNo] = useState("")

//     const [pesan, setPesan] = useState(`
//     Kepada Saudara/i,

// Kami dengan bahagia ingin mengundang Saudara/i untuk menghadiri pernikahan kami yang akan diselenggarakan secara daring melalui website pernikahan kami pada:

// Tanggal: [tanggal pernikahan]

// Kami telah membuat website pernikahan untuk memudahkan Anda mendapatkan informasi tentang acara kami, termasuk detail acara, peta lokasi, dan juga galeri foto. Kami juga menyediakan formulir RSVP untuk memudahkan Anda mengonfirmasi kehadiran Anda di hari spesial kami.

// Silakan kunjungi [nama website] untuk mengakses semua informasi pernikahan kami dan melihat galeri foto kami.

// Terima kasih atas perhatian dan kehadiran virtual Saudara/i. Kami sangat berharap untuk bertemu dengan Anda di hari pernikahan kami, baik secara daring maupun secara fisik.

// Salam hangat,

// [ Nama pasangan pengantin]
//     `)
    const [whatsapp, setWhatsapp] = useState([])

   
   const deleteById = id => {
    setHasil(oldValues => {
        return oldValues.filter(hasils => hasils !== id)
    })
   }

   const detailLink = (id) => {
        const selected = hasil.find(item => item.id === id);
        if (selected) {
            setSelectedData(selected);
            setPopup(true);
           
        } else {
           return;
        }
   }

   const prosesKirim = (event) =>{
        event.preventDefault();
        setNo('')
        let name = document.getElementById('linkFix').value;
        // let plus = pesan.replace(/ /g, "%20")
        const cekHasil = hasil.map(data => {
            return data.link;
        })
        whatsapp.push({
            id: whatsapp.length + 1,
            linkKirim: `https://wa.me/${no}?text=Hallo:${tamu}, ${name}`,
            tamu:tamu
        })
        setTimeout(() => {
            whatsapp.map(data => {
                return window.open(data.linkKirim, '_blank'); 
                
            }, 1000)
            setWhatsapp([])

        })
        
   }
  
    const handlesubmit = (event) => {
        event.preventDefault();
        if(tamu === ''){
            alert('harap masukan nama tamu!')
            return;
        }

        if(link === ''){
            alert('harap masukan link undangan!')
            return;
        }
        setTamu('')
        let plus = tamu.replace(/ /g, "+")
        hasil.push({
            id: hasil.length + 1,
            link: `${link}?to=${plus}`,
            tamu: tamu
        })
       
        
    }

    const stylebackground = {
        backgroundImage: `url(${wedding})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }

    return(
        <>
           <div className="flex flex-col sm:flex-row md:flex-row justify-end">
                <div className="fixed left-0 flex hidden md:block lg:block items-center justify-center h-screen w-full sm:w-1/2 md:w-1/2 bg-blend-darken" style={stylebackground}>
                <div className='absolute top-96 left-1/4'>
                <h1 className='font-bold text-slate-700 text-2xl text-center text-white'>Create Nama Tamu</h1>
                <p className='text-slate-600 text-center text-white'>Silahkan isi tamu undangan yang akan anda kirimkan</p>
                </div>
                </div>
                <div className='flex w-full sm:w-1/2 md:w-1/2 items-center'>
                    <div className='w-full py-20'>
                    <h1 className='text-3xl font-bold text-center'>E-wedding.web.id</h1>
                    <form onSubmit={handlesubmit} className='flex flex-col w-full sm:px-20 px-10 sm:px-52 md:px-20 pt-20'>
                        <label className='text-slate-600 font-medium'>Link undangan:</label>
                        <label className='text-slate-600 mb-2'>contoh: https://e-wedding.web.id/anggie-aditya/ </label>
                        <input type='text' value={link} onChange={(event) => setLink(event.target.value)} className='w-full ring-1 text-gray-700 rounded-md focus:bg-blue-50 focus:ring-blue-500 py-1 px-2 ring-gray-200 focus:outline-0 text-md mb-5'/>
                        <label className='text-slate-600 font-medium'>Nama Tamu:</label>
                        <label className='text-slate-600 mb-2'>contoh: suami dan istri (Tidak Boleh Pakai Simbol &) </label>
                        <input type='text' value={tamu} onChange={(event) => setTamu(event.target.value)} className='w-full ring-1 text-gray-700 rounded-md focus:bg-blue-50 focus:ring-blue-500 py-1 px-2 ring-gray-200 focus:outline-0 text-md mt-2'/>
                        <button className='transition ease-in-out delay-150 hover:-translate-y-1 px-1 hover:bg-green-700 hover:text-white py-2 rounded-md bg-green-200 text-green-700 w-40 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-4' type='submit'>Generate Tamu</button>
                        </form>
                        <div className='w-full'>
                        <div className='flex sm:px-20 px-10 md:px-20 lg:px-20'>
                      <ul className=''>
                      
                            <h1 className='text-xl font-bold mt-5'>Link Tamu:</h1>
                            {hasil.map(tamus => {
                                return(
                                    <>
                                    <div className='flex gap-x-2 items-center'>
                            <a href={tamus.link}>
                            
                            <li className='text-slate-600 my-2' key={tamus.id}>{tamus.id}. {tamus.link}</li></a>
                        <button onClick={() => deleteById(tamus)} className='transition ease-in-out delay-150 bg-red-200 text-red-700 hover:bg-red-700 hover:text-white rounded-md px-2 py-1'><IconTrash width="20px" height="20px"/></button>
                        <button onClick={() => detailLink(tamus.id)} className='transition ease-in-out delay-150 bg-blue-200 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md px-2 py-1'><IconSend width="20px" height="20px"/></button>
                        </div>
                
                  </>
                        )
                    })}
                </ul>
                </div>
                </div>

                    </div>
                </div>

           </div>
           <Transition
        show={popup}
        enter="transition duration-500 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
          
           <div className='fixed top-0 left-0 w-full h-screen' style={{ backgroundColor: "rgba(0,0,0,0.5)" }} >
                <div className='fixed bg-white w-full sm:w-1/2 md:w-1/2 lg:w-1/2 h-screen sm:h-3/4 md:h-3/4 lg:h-3/4 rounded-md drop-shadow-md sm:top-20 md:top-20 lg:top-20 top-0 left-0 sm:left-1/4 md:left-1/4 lg:left-1/4'>
                    <button onClick={() => {setPopup(!popup)}}><IconSquareRoundedX className='absolute top-0 right-0' width="40px" height="40px"/></button>
                    <div className='p-10'>
                    {selectedData  && (
                        <>
                        <h1 className='font-bold text-2xl text-center mb-5'>Kirim Undangan Lewat Whatsapp</h1>
                        <div className='mb-5'>
                            <h1 className='font-medium text-black text-lg'>Link Undangan:</h1>
                            <input value={selectedData.link} id="linkFix" className='w-full bg-gray-100 cursor-not-allowed ring-1 text-gray-700 rounded-md py-1 px-2 ring-gray-200 focus:outline-0 text-md mt-2' readOnly></input>
                        </div>
                        </>
                    )
                        
                    }
                       <div className='mb-5'>
                            <label className='font-medium text-black text-lg' name="">No Whatsapp:</label><br></br>
                            <label className='text-slate-600 mb-2'>Note: Harap Gunakan Kode Negara Dan Tidak Pakai Spasi. Contoh: (628979382175)</label>
                            <input   type='text' value={no} onChange={(e) => setNo(e.target.value)} className='w-full ring-1 text-gray-700 rounded-md focus:bg-blue-50 focus:ring-blue-500 py-1 px-2 ring-gray-200 focus:outline-0 text-md mt-2'/>
                        </div>
                        {/* <label className='font-medium text-black text-lg mb-5'>Pilih Template Pesan:</label>
                        <div className='flex items-center-justify-center gap-x-3 mt-4 mb-4'>
                            <div className='w-1/3 bg-white rounded-md drop-shadow-xl'>
                                <img src={muslim} className="w-20 mx-auto p-2" alt="" />
                            </div>
                            <div className='w-1/3 bg-white rounded-md drop-shadow-xl'>
                                <img src={kristen} className="w-20 mx-auto  p-2" alt="" />
                            </div>
                            <div className='w-1/3 bg-white rounded-md drop-shadow-xl'>
                                <img src={buddha} className="w-20 mx-auto  p-2" alt="" />
                            </div>

                        </div> */}
                        {/* <textarea value={pesan} onChange={(e) => setPesan(e.target.value)} defaultValue="" className='w-full ring-1 text-gray-700 rounded-md focus:bg-blue-50 focus:ring-blue-500 py-1 px-2 ring-gray-200 focus:outline-0 text-md mt-2 mb-5 h-64'>
                        </textarea> */}
                        <button onClick={prosesKirim} className='flex flex-inline gap-x-3 px-4 py-2 transition ease-in-out delay-150 hover:-translate-y-1 px-1 hover:bg-green-700 hover:text-white py-2 rounded-md bg-green-200 text-green-700 w-60'><IconBrandWhatsapp />Kirim Pesan Whatsapp</button>
                      
                    </div>
                </div>
           </div>
           </Transition>
        </>
    )
 }

 export default Form;