// import React from 'react';
// import './node.css';
// import clone from 'clone'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import classes from './Pedigree.module.css';
// import plusUser from '../../assets/images/user-plus.png'
// import camera from '../../assets/images/camera.jpg';
// import data from './data';
// import { setTreeData } from './Pedigree';



// function Node({nodeDatum, toggleNode, onNodeClick}) {

//   onNodeClick = (nodeDatum) => {
//     console.log(nodeDatum);
//     Swal.fire({
//       title: nodeDatum.name,
//       html:`
//         <Modal
//           isOpen={false}
//           toggle={toggleEdit}
//           size='lg'
//           centered
//           style={{direction:'rtl'}}
//         >
//         <ModalHeader style={{textAlign:"center"}}>
//           {${nodeDatum.name}}
//         </ModalHeader>

//         <ModalBody>
//             <div>
//               <input 
//                   type="file" 
//                   id="inputFile" 
//                   accept="image/x-png,image/gif,image/jpeg" 
//                   className={classes.inputFile}
//               />
//               <button onClick={console.log('image clicked')} id="button-camera" className={classes.buttonCamera}>
//                   <img src={camera} alt="camera" id="camera" className={classes.camera}/>
//               </button>
//             </div>
//             <img src={'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'} alt={'name'} className={classes.ImageUser}/>
//             <br/>
//             <br/>
          
//             <div className={classes.dropdown}>
//                 <button id="button-Plus-User" className={classes.buttonPlusUser}>
//                   <img src={plusUser} alt="plususer" id="plusUser" className={classes.plusUser}/>
//                 </button>
//                 <div className={classes.dropdownContent}>
//                   <button onClick={console.log('add new node')} id="father">אבא</button>
//                   <button onClick={console.log('add new node')} id="mother">אמא</button>
//                   <button onClick={console.log('add new node')} id="brother">אח</button>
//                   <button onClick={console.log('add new node')} id="sister">אחות</button>
//                   <button onClick={console.log('add new node')} id="son">ילד </button>
//                   <button onClick={console.log('add new node')} id="daughter">ילדה</button>
//                   <button onClick={console.log('add new node')} id="husband">בעל</button>
//                   <button onClick={console.log('add new node')} id="wife">אישה</button>
                
//                 </div>
//               </div>

//             <br/>
//             {
//               <form style={{direction:'rtl'}}>
//                 <label style={{marginLeft:'650px'}} className={classes.LablePedigree}>שם : </label>
//                 <br/>
//                 <input  type="text" id="name" className={classes.InputPedigree} placeholder={${nodeDatum.name}}/>
//                 <br/>
//                 <br/>
//                 <label style={{marginLeft:'675px'}} className={classes.LablePedigree}>מגדר: </label>
//                 <br/>
//                 <input  type="radio"  id="male" name="gender" value="male"/>
//                 <label  className={classes.LablePedigree}>זכר </label>
              
//                 <input type="radio"  id="female" name="gender" value="female"/>
//                 <label className={classes.LablePedigree}>נקבה </label>
              
//                 <br/>
//                 <br/>
//                 <label style={{marginLeft:'635px'}} className={classes.LablePedigree}>תאריך לידה: </label>
//                 <br/>
//                 <input type="date" className={classes.InputPedigree} />
//                 <br/>
              
//                 <br/> 
//                 <input style={{marginLeft:'10px'}} type="checkbox" id="myCheck" />
//                 <label className={classes.LablePedigree} style={{marginLeft:'670px'}}>חי</label>
//                 <br/>
//                 <br/>
//                 <label style={{marginLeft:'620px'}} className={classes.LablePedigree}>תאריך פטירה: </label>
//                 <br/>
//                 <input  id="deathId" disabled={false} type="date" className={classes.InputPedigree} />
//                 <br/>
//                 <br/>
//                 <label style={{marginLeft:'665px'}} className={classes.LablePedigree}>אימייל:</label>
//                 <br/>
//                 <input type="email" className={classes.InputPedigree} />     
//                 <br/>        
//             </form> 
//             }
//           </ModalBody>
//         </Modal>`,
//       confirmButtonText: 'שמור שינויים',
//       showCancelButton: true,
//       cancelButtonText: 'ביטול',
//       preConfirm: function () {
//           const name = document.getElementById('name').value;
//           const updatedData = findNode(nodeDatum.id, data, name);
//       }
//     })
//   }

//   return (
//     <g id="con">
//       <foreignObject width={250} height={250} x={-102} y={-40} onClick={() => onNodeClick(nodeDatum)}>
//         <div >
//           <p id="man" >{nodeDatum.name}</p>
//           {
//             nodeDatum.attributes.wife 
//             ? <p id="woman">{nodeDatum.attributes.wife}</p> 
//             : null
//           }
//         </div>
//       </foreignObject>
//     </g>
//   );
// }

// export default Node;