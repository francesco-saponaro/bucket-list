import ChatButton from '@core/ChatButton';
import styles from '@styles/index.module.scss';
import DocumentCard from './CardsUpload/DocumentCard';
import PhotoCard from './CardsUpload/PhotoCard';
import OtpInput from './OtpInput';
import { useState } from 'react';
import PrimaryButton from '@core/PrimaryButton';
import Icon from '@assets/icons/alert.svg';
import NotificationIcon from '@assets/icons/notification.svg';
import DynamicLoader from '@core/Loader';
import Accordion from './Accordion';
import IconButton from '@core/IconButton';
import Tabs from '@core/Tabs';
import Modal from './Modal';
import User from '@core/User';
import ContractCard from './ContractCard';

const Index: React.FC = () => {
    const [otp, setOtp] = useState('' as string);
    const [activeTab, setActiveTab] = useState(0);
    const domande = [{title: 'Domanda 1', text:'1'}, {title: 'Domanda 1', text: '2'}];
    const [modalState, setModalState] = useState(false);
    const contracts = [{ type: 'Luce', description: 'Risparmio atteso annuo', price: '€ 250', address: 'Via Roma 1', tags: ['Azienda'], status: 0}, 
    { type: 'Gas', description: 'Risparmio atteso annuo', price: '€ 250', address: 'Via Roma 1', tags: ['Privato'], status: 1},];

    const tabData = [
        {label: 'Personali', content: <>{contracts.map((contract) => <ContractCard {...contract}/>)}</>}, 
        {label: 'Amici', content:<>
            {contracts.map((contract)=><div style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}>
                <div style={{display: 'flex', padding:'0px 12px'}}><User id={1} name='John' surname='Doe' /></div>
                <ContractCard {...contract}/>
            </div>)}
            </>
        }
    ];

    const handleChange = (otp: string) => {
        setOtp(otp);
    };
    return (
        <div className={styles.page}>
            <div style={{ overflowY: 'scroll', height: '100%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px', padding: '24px', color: 'black' }}>
                <h1>Common Elements</h1>
                <Tabs tabs={tabData} activeTab={activeTab} setActiveTab={setActiveTab} className={''}/>
                <Modal modalState={modalState} setModalState={setModalState} children={<p>hello there</p>} />
                <PrimaryButton text='Primary' onClick={() =>{
                    setModalState(true)
                }} />
                <PrimaryButton text='Secondary' variety='secondary' leftIcon={<Icon />} onClick={() => { }} />
                <PrimaryButton text='Tertiary' variety='tertiary' width={'100%'} onClick={() => { }} />
                <ChatButton />
                <Accordion title='Domande frequenti' isOpen={true} children={domande.map((item, index)=>{
                    return <>
                        <Accordion key={index} title={item.title} isOpen={false} variety={'child'} onClick={()=>{console.log('hello')}} children={[
                            <p>{item.text}</p>
                        ]}/>
                    </>
                })}/>
                <IconButton icon={<NotificationIcon />} hasnotificationBadge={true} onClick={()=>{console.log('hello')}}/>
                <OtpInput value={otp} valueLength={6} onChange={handleChange} />
                <DynamicLoader value={85} />
                <div style={{ display: 'flex', gap: '8px', padding: '16px', height: 'fit-content', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <DocumentCard isTaller={true} />
                    <PhotoCard />
                </div>
            </div>
        </div>
    );
};

export default Index;