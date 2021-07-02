import { IonContent, IonHeader, IonPage, IonItemDivider, IonList, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import Psychologist from '../components/Psychologist';
import CardDate from '../components/CardDate';
import CardTime from '../components/CardTime';
import CardSubmit from '../components/CardSubmit';
import IData from '../IData';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../firebase';
import './Home.css';
import { render } from '@testing-library/react';


const Home: React.FC = () => {

const [data, setData] = useState<IData[]>();

useEffect(() => {
    db.collection("myApp")
      .get()
      .then((querySnapshot) => {
        let data: IData[] = [];
        data = querySnapshot.docs.map((doc) => {

              return {
                id: doc.id,
                name: doc.data().name,
                date: doc.data().date.toDate().toISOString(),
                img: doc.data().img,
                active: doc.data().active
              };
          });
          console.log(data);
          
          setData(data);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  }, []);

console.log(data);

  //using hook useState to set the selected data (psychologist, date, time)
  const [meetingActive, setMeetingActive] = useState<IData>({id: '1', name: 'Сергей Куликов', date: '2021-06-20T15:40:40.394Z', img: 'man', active: false});
  const [dateActive, setDateActive] = useState<string>('2021-06-20T15:40:40.394Z')
  const [timeActive, setTimeActive] = useState<string>('2021-06-20T15:40:40.394Z')

  //slicing date string
  let getDate = (date: string) => date.split('').slice(0, 10).join('');

  //filtering duplicates name to render card of psychologist
  let filterData = () => {
    let names: IData[] = [];

    data?.map(meeting => {
      names.push(meeting);
    })

    names = names.filter((thing, index, self) => 
      index === self.findIndex((t) => (
        t.name === thing.name
      ))
    )

    return names;
  }

  //filtering duplicates date to render card of date
  let filterDate = () => {
    let meetings: IData[] = [];

    data?.map(meeting => {
      if(meeting.name === meetingActive.name){
        meetings.push(meeting);
      }})

    let res = meetings.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        getDate(t.date) === getDate(thing.date)
      ))
    )

    return res;
  }

  //function when clicking on the appropriate psychologist sets his name as active
  const choosePsychologist = (meeting: IData) => {
    setMeetingActive(meeting);
    setDateActive(meeting.date);
  };

  //function when clicking on the appropriate date sets it as active
  const chooseDate = (date: string) => setDateActive(date);

  //function when clicking on the appropriate time sets it as active
  const chooseTime = (time: string) => setTimeActive(time);

  //definition of the selected meeting
  const getMeetingActive = () => {
    console.log(meetingActive);
    console.log(timeActive);

    let res = {};

    data?.forEach(meeting => {
      if(meeting.name === meetingActive.name && meeting.date === timeActive){
        meeting.active = true;
        res = meeting;
      }
    })
    return res;
  }

  //a post request should be sent here to record the selected 
  //meeting in the database with the field active: true
  const submitMeetingActive = () => {
    let activeMeeting = getMeetingActive();
    console.log(activeMeeting);
  }

  //render screen
  return (
    <IonPage className="app">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Make an appointment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Make an appointment</IonTitle>
          </IonToolbar>
        </IonHeader>
          {//rendering of psychologists' cards with data transfer and click response functions in props
            filterData()
              .map((meeting: IData) => <Psychologist key={meeting.id} meeting={meeting} onChoose={choosePsychologist} meetingActive={meetingActive}/>)
          }
        <IonItemDivider className="date-time__block">
          <IonLabel className="heading">Возможная дата</IonLabel>
          <IonList  className="scroll">
            {//rendering of date cards with data transfer and click response functions in props
              filterDate().map(meeting => {
                    return <CardDate key={meeting.id} meeting={meeting} onChoose={chooseDate} dateActive={dateActive}/>
                })
            }
          </IonList>
        </IonItemDivider>
        <IonItemDivider className="date-time__block">
          <IonLabel className="heading">Свободное время</IonLabel>
          <IonList className="scroll">
            {//rendering of time cards with data transfer and click response functions in props
              data?.map(meeting => {
                if(getDate(meeting.date) === getDate(dateActive)){
                  return <CardTime key={meeting.id} meeting={meeting} onChoose={chooseTime} timeActive={timeActive}/>
                }
              })
            }
          </IonList>
        </IonItemDivider>
        <CardSubmit dateActive={dateActive} timeActive={timeActive} onSubmit={submitMeetingActive}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
