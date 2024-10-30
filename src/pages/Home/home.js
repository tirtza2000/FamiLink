import React from 'react'
import {Link} from 'react-router-dom'
import  './home.css'
import people from '../../assets/images/circle.png'
import BigTree from '../../assets/images/BigTree.png'
import Calendar from '../../assets/images/Calendar.png'
import Gallery from '../../assets/images/Gallery.png'
import pink from '../../assets/images/pink.PNG'
import phone from '../../assets/images/phone.png'
import mail from '../../assets/images/mail.png'
import Spinner from '../../components/UI/Spinner/Spinner'

class Home extends React.Component{

    render() {
        return(
            <div>
               
                <div id="home">
                    <img src={people} alt={"people"} id="people"/>
                    <p id="people2">
                        <h1 style={{fontSize:"80px"}}>family </h1>
                        <h3 style={{fontSize:"55px"}}>is not an important thing.<br/>
                            It's everything....</h3><br/>
                        <h5 style={{fontSize:"25px"}}>FamiLink- Your family experience</h5>
                    </p>
                    <Link to="/login">
                            <button id="bb" className="button" ><span>התחל</span></button>
                     </Link>
                </div>
                <div id="linkme">
                        <h style={{fontSize:"50px"}}>FamiLink</h><br/>
                        <h style={{fontSize:"25px"}}>ברוכים הבאים לאתר המשפחתי</h>
                 </div>
                <div id="tree">
                     <img src={BigTree} alt={"BigTree"} id="BigTree"/>
                     <h id="ilan">אילן</h>
                     <h id="yuhasin">יוחסין</h>
                     <p id="TreeText" style={{direction:"rtl"}}>בניית אילן יוחסין<br/>
                                    בקלות ובמהירות...<br/>
                                    תוכלו להוסיף כל קרוב משפחה<br/>
                                    שתרצו לאילן שלכם ולהזמין אותו<br/>
                                     להשתתף לקבוצה ולהנות מהאתר משפחתי 
                     </p>
                     <Link to="/login">
                            <button id="b1" className="button" ><span>התחל</span></button>
                     </Link>
                </div>
                <div id="calander">
                    <img src={Calendar} alt={"Calendar"} id="CalendarPic"/>
                     <h id="luch">לוח</h>
                     <h id="event">אירועים</h>
                     <p id="CalendarText">לוח שנה<br/>
                                      בו תוכלו להוסיף <br/>  
                                      כל ארוע משפחתי<br/>
                       ולקבל תזכורת על אירועי היום  <br/>
                     </p>
                      <Link to="/login">
                        <button id="b2" className="button"><span>הוסף אירוע</span></button>
                      </Link>
                </div>
                <div id="Gallery">
                <img src={Gallery} alt={"Gallery"} id="GalleryPic"/>
                     <h id="gal">גל</h>
                     <h id="ery">ריה</h>
                     <p id="GalleryText">כאן תוכלו להעלות<br/>
                                 תמונות לגלריה המשפחתית<br/>
                                  מכל הזמנים, ובכך לשתף<br/>
                            ...את המשפחה בחוויות ולהתעדכן<br/>
                     </p>
                     <Link to="/login">
                         <button id="b3" className="button"><span>הוסף תמונה</span></button>
                     </Link>
                </div>
                <div id="pink">
                     <img src={pink} alt={"pink"} id="pinkPic"/>
                     <p id="pinkP">הצטרפו אלינו לחויה דיגיטלית  <br/> משפחתית שטרם הכרתם</p>
                     <br/>
                     <Link to="/register">
                         <button id="b4">הירשם</button>
                     </Link>
                </div> 
                <div id="black">
                    <p id="blackP">רשומים? נהדר!<br/>
                       התחברו לאתר <br/>
                        לקבוצה המשפחתית שלכם</p>
                    <Link to="/login">
                        <button id="b5">התחבר</button>
                    </Link>
                    <img src={phone} alt={"phone"} id="phone"/>
                    <label id="l1">Tel: +972 504124407</label>
                    <img src={mail} alt={"mail"} id="mail"/>
                    <label id="l2">info@familink.com</label>
                </div>
                <p id="end" >&copy; 2021 by Tirtza Barzilay & Hani Abu</p>
                <br/>
                <br/>

            </div>
        );
    }
}

export default Home