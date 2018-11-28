import React from 'react'
import SendBox from '../components/sendBox'
import TopBar from '../components/topBar'
// import icons from './../assets/icons/index';
import Modals from '../components/modals'


export default () => (
    <main className="send">
      <TopBar/>
      <SendBox />
      <Modals modalName='success' />
    </main>
  );