import React from 'react'
import people from '../../assets/images/circle.png'
import './groupHome.css'
import image from '../../assets/images/home-image.png'
import tree from '../../assets/images/home-tree.png'
import calendar from '../../assets/images/home-calendar.png'
import { Link, withRouter } from 'react-router-dom'
import one from '../../assets/images/1.PNG'
import two from '../../assets/images/2.PNG'
import three from '../../assets/images/3.PNG'
import Swal from 'sweetalert2'
class GroupHome extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            GroupName: null
        }
        this.handleClick = this.handleClick.bind(this);
    }
 
    componentDidMount() {
        if (this.props.groupId) {
            fetch(`http://localhost:3003/group/${window.location.href.split('/').pop()}`)
            .then(res => res.json())
            .then(data => this.setState({GroupName: data[0].GroupName}))
            .catch(err => console.log(err))
        } else Swal.fire({
            icon: 'info',
            title: 'יש להתחבר על מנת לראות את עמוד הבית של הקבוצה',
            confirmButtonText: 'בסדר',
            confirmButtonColor: '#EF9C83'
          }).then((clicked) => {if (clicked) { this.props.history.push('/login')}})
        
    }

    handleClick=()=> {
        Swal.fire({
            title: 'הזן כתובת מייל להצטרפות לקבוצה ',
            input: 'email',
            confirmButtonColor: '#ef9c83',
            confirmButtonText: 'שלח',
            showCancelButton: true,
            cancelButtonText: 'ביטול',
            reverseButtons: true
        }).then((clicked) => {
            if (clicked.isConfirmed) {
                const email_to = clicked.value;
                const subject =  ' הוזמנת להצטרף לקבוצת '+ this.state.GroupName ;
                const message = 'שלום וברכה' + '\n' + 'הנך מוזמן להצטרף לקבוצה משפחתית ב' + 'Family Link'+ '\n' + ' הכנס לקישור הבא: ' + 'http://localhost:3000/Register'+ '\n' + ' צור משתמש עם קוד הקבוצה הזה: ' + this.props.groupId;
                fetch('http://localhost:3003/sendInvetation', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email_to: email_to,
                        subject: subject,
                        message: message
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err)).then(
                    Swal.fire({
                        icon: 'success',
                        iconColor:'#EF9C83',
                        title: '!קוד קבוצה נשלח בהצלחה',
                        confirmButtonText: 'תודה',
                        confirmButtonColor: '#EF9C83'
                      })
                  )
            }
          })
    }

    render() {
        return(
            <div>
                <div id="Divpink">
                    <h1 id="familyName">{this.state.GroupName}</h1> 
                    <br/>
                    <button className="button" onClick={this.handleClick}>הזמן בני משפחה</button>
                </div>
                <div>
                     <img src={one} id="one" alt="one"/>
                     <img src={two} id="two" alt="two"/>
                     <img src={three} id="three" alt="three"/>
                </div>
                <div id="boxes">
                   
                    <span id="pink-Square">
                        <Link to="/Calendar">
                            <img src={image} alt={'image'} id="image-box"/>   
                            <div className="overlay">
                                <div className="text">הוסף אירוע </div>
                            </div> 
                        </Link>
                    </span>

                    <span id="blue-Square"> 
                   
                       <Link to="/Pedigree">
                            <img src={tree} alt={'tree'} id="image-box"/>
                            <div className="overlay">
                                <div className="text">צור אילן יוחסין</div>
                            </div> 
                       </Link> 
                       
                    </span>

                    <span id="purple-Square">
                        <Link to="/Photo">
                            <img src={calendar} alt={'calendar'} id="image-box"/>
                            <div className="overlay">
                                <div className="text">הוסף תמונה</div>
                            </div>
                        </Link> 
                    </span>

                </div>
                <div id="white">

                </div>
            </div>
          
        )
    }
}

export default withRouter(GroupHome);
