import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'
import classes from './Calendar.module.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import alertPic from '../../assets/images/heart2.jpg'

class Calendar extends Component {
 
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      calendarWeekends: true,
      eventId:'',
      eventName:'',
      fromDate:'',
      toDate:'',
      CalendarEvent:[],
      goToPast:''
    };
  }

  //מציג תזכורת של האירועים היום
  getTodaysEvents = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() > 8 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))}-${date.getDate()}`;
    const todayEvents = this.state.CalendarEvent.filter(event => {
      if (event.start === today) return event
    });
    let eventString = '';
    todayEvents.map(event => eventString = eventString + event.title + '\n');
    swal.fire({
      title: ':אירועים היום',
      text: eventString || 'אין אירועים היום',
      imageUrl: alertPic,
      imageSize: '600x500',
      imageAlt: 'Custom image',
      width:600,
      heightAuto:700,
      confirmButtonColor:'#ef9c83',
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i>  תודה ',
      showCloseButton: true,

    })
  }

  //טוען את האירועים מבסיס הנתונים
  componentDidMount() {
    if (this.props.groupId) {
      this.props.toggleSpinner();
      fetch(`http://localhost:3003/calendar/${this.props.groupId}`)
      .then(res => res.json())
      .then(data => {
        this.props.toggleSpinner();
         data.forEach(event => {
          this.AddEvent(event.EventId, event.EventName, event.EventDate.slice(0,10));
        });
        this.getTodaysEvents();
      })
      .catch(err => {console.log(err);this.props.toggleSpinner();})
    } else swal.fire({
      icon: 'info',
      iconColor:'#EF9C83',
      title: 'יש להתחבר על מנת לראות את לוח השנה',
      confirmButtonText: 'בסדר',
      confirmButtonColor: '#EF9C83'
    }).then((clicked) => {if (clicked) { this.props.history.push('/login')}})
  }

  onDatePastChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //פונקציה המופעלת בזמן לחיצה על תאריך מסוים ופותחת את המודל
  handleDateClick = (eventClickInfo) => {
    this.toggle();
    this.setState(eventClickInfo.event);
    const newdate = (eventClickInfo.date.getFullYear() + "-" + ((eventClickInfo.date.getMonth() > 8) ? (eventClickInfo.date.getMonth() + 1) : ('0' + (eventClickInfo.date.getMonth() + 1))) + "-" + ((eventClickInfo.date.getDate() > 9) ? eventClickInfo.date.getDate() : ('0' + eventClickInfo.date.getDate())));
    this.state.fromDate = newdate;
    document.getElementById('fromDate').placeholder = newdate;
  };

  //מוחק אירוע כשלוחצים עליו
  handleEventClick= (eventClickInfo) => { 
    console.log(eventClickInfo)
    swal.fire({
      icon: 'info',
      iconColor: '#EF9C83',
      title: '?האם ברצונך למחוק את האירוע',
      showCancelButton: true,
      cancelButtonColor: '#EF9C83',
      cancelButtonText:'ביטול',
      confirmButtonText: 'מחק',
      confirmButtonColor: '#EF9C83'
    })
    .then((clicked) => {
      if (clicked.isConfirmed) {
        const id = eventClickInfo.event.id;
        let updatedEvents = [...this.state.CalendarEvent]
        for(var i = 0; i < updatedEvents.length; i ++) {
          if(updatedEvents[i].id == id) {
            updatedEvents.splice(i, 1);
            break;
          }
        }
        this.setState({CalendarEvent: updatedEvents});
      }
     })
    fetch(`http://localhost:3003/calendar/removeEvent`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        eventId: eventClickInfo.event.id,
        groupId: this.props.groupId
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
 
  //מעביר את המיקום של האירוע כשגוררים אותו
  handleEventDrop = (info) => {
    console.log(this.state.CalendarEvent)
    //של האירוע id
    const id=info.event.id
    //העתקה של המערך
    let events = [...this.state.CalendarEvent];
    //מציאת אינקס לשינוי תאריך התחלה
    const index= events.findIndex(item => item.id==id)
    //העתקה של האובייקט לשינוי
    let eventToChange = {...events[index]};
    const date = eventToChange.start
    const newDate=( info.event.start.getFullYear()+"-"+((info.event.start.getMonth() > 8) ? (info.event.start.getMonth() + 1) : ('0' + (info.event.start.getMonth() + 1))) +"-"+ ((info.event.start.getDate() > 9) ? info.event.start.getDate() : ('0' +info.event.start.getDate())));
    //עדכון תאריך התחלה
    eventToChange.start = newDate;
    //עדכון האובייקט
    events[index] = eventToChange;
    //עדכון של המערך
    this.setState({CalendarEvent: events});
    console.log(this.state.CalendarEvent)
    console.log(id)
    console.log(newDate)
    fetch(`http://localhost:3003/calendar/updateEvent`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        EventId:id,
        newDate:newDate,
        groupId: this.props.groupId
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

   //כאשר משנים את האינפוט
   inputChange = (event) => {
      this.setState({[`${event.target.id}`]: event.target.value})
   }

   AddEvent = (id, title, start) => {
    this.setState(prevState => ({
      CalendarEvent: [...prevState.CalendarEvent, {
        id: id,
        title: title,
        start: start
      }]
    }))
    
   }

   //מוסיף אירוע ומעדכן אותו בלוח השנה
  AddEventHandle = (event) => {
    let id=Date.now()
    
    console.log(id)
    console.log('AddEventHandle')
    this.AddEvent(id, this.state.eventName, this.state.fromDate);
    console.log(this.state.CalendarEvent)
    fetch(`http://localhost:3003/calendar/addEvent`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        EventId:id,
        name: this.state.eventName,
        group: this.props.groupId,
        date: this.state.fromDate
      })
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(err => console.log(err))
    this.toggle();
    this.setState({eventName:''})
  }


  checkValidity = () => {
    if(this.state.eventName==='')
    {  swal.fire({
        icon: 'info',
        iconColor:'#EF9C83',
        title: 'שם אירוע זהו שדה חובה',
        confirmButtonText: 'בסדר',
        confirmButtonColor:'#EF9C83'
        })
   }
    else 
      this.AddEventHandle()
  }

   //פונקציה שעוברת לתאריך ברצוי
  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(this.state.goToPast); // call a method on the Calendar object
  };
 
  render() { 

    return (
    
      <div className={classes.calendarContent}> 
          <h1 className={classes.header}>לוח שנה</h1>
          <input
            type='date'
            name='goToPast'
            value={this.state.goToPast}
            onChange={this.onDatePastChange('goToPast')}
            className={classes.InputDatePast}
          />
          <label className={classes.label}>בחר תאריך:</label> 
          <br/><br/><br/>
          <button onClick={this.gotoPast} className={classes.button}>עבור </button>
          <br/> <br/> <br/> 
          <FullCalendar
            height={'860px'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,bootstrapPlugin]}
            theme={true}
            themeSystem='bootstrap'
            initialView="dayGridMonth"
            ref={this.calendarComponentRef}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            
            }}
            customButtons={{
              custom: {
                text: 'custom 1',
                click() {
                  this.gotoPast();
                },
              },
            }}
            editable={true}
           
            eventBackgroundColor={"#EF9C83"}
            eventBorderColor={"#EF9C83"}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            droppable= {true}
            weekends={this.state.calendarWeekends}
            dateClick={this.handleDateClick}
            eventDrop={this.handleEventDrop}
            eventClick={this.handleEventClick}
            events={this.state.CalendarEvent}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          />
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            size='lg'
            centered
          >
          <ModalHeader toggle={this.toggle} style={{ fontWeight:'bold', fontSize:'large',marginLeft:'590px'}} >
            :הוסף אירוע 
          </ModalHeader>
          <hr/>
          <ModalBody>
            {
              <form className={classes.form}>
                <label className={classes.LableCalendar}  htmlFor="eventName"  >:שם אירוע</label>
                  <br/>
                <input className={classes.InputCalendar} type="text"  placeholder="שם אירוע"  name="eventName"  onChange={this.inputChange}  id="eventName" required/>
                <br/>
                <br/>
                <label className={classes.LableCalendar}  htmlFor="fromDate">:תאריך </label>
                <br/>
                <input className={classes.InputCalendar} type="text" placeholder="Enter from date" name="fromDate" onChange={this.inputChange} id="fromDate" />
                <br/>
              </form> 
            }
          </ModalBody>
          <ModalFooter style={{marginRight:'280px'}}>
            <button  onClick={this.checkValidity} className={classes.button}>
              הוסף
            </button>
            <button  onClick={this.toggle} className={classes.button}>
              סגור
            </button>
          </ModalFooter>
        </Modal>
        <div >{this.props.displaySpinner ? <Spinner/> : null}</div>
      </div>
    )
  }
}

export default withRouter(Calendar);