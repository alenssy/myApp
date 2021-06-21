import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import IData from '../IData';

//definition of element props
type PsychologistProps = {
  meeting: IData,
  onChoose(meeting: IData): void,
  meetingActive: IData
}

//render functional component
const Psychologist: React.FC<PsychologistProps> = ({meeting, onChoose, meetingActive}) => {

  let classesIonCard: Array<string> = ['app'];

  meetingActive.name === meeting.name ? classesIonCard.push('active') : classesIonCard.push('');

  return (
        <IonCard className={classesIonCard.join(' ')} onClick={() => onChoose(meeting)}>
          <IonCardHeader>
            <IonCardTitle className="name">{meeting.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="flex">
            <img src={'assets/icon/'+meeting.img+'.png'} alt={meeting.img} width="144"/>
            <div className="">
              <p className="duration__text">Длительность консультации</p>
              <span className="duration__time">50 минут</span>
            </div>
          </IonCardContent>
        </IonCard>);
};

export default Psychologist;