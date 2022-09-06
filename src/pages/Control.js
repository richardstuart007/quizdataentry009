//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Sub Components
//
import QuestionList from './Question/QuestionList'
import OwnerList from './Owner/OwnerList'
import ReflinksList from './Reflinks/ReflinksList'
import Group1List from './Group1/Group1List'
import Group2List from './Group2/Group2List'
import Group3List from './Group3/Group3List'
import ServerData from './ServerData/ServerData'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
// Debug Settings
//
const g_log1 = debugSettings()
//
//  Global
//
let g_Page
//===================================================================================
function Control() {
  if (g_log1) console.log('Start Control')
  //.............................................................................
  //  Main Line
  //.............................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  g_Page = snapShot.v_Page
  //
  //  Present the selected component
  //
  switch (g_Page) {
    case 'QuestionList':
      return <QuestionList />
    case 'OwnerList':
      return <OwnerList />
    case 'ReflinksList':
      return <ReflinksList />
    case 'Group1List':
      return <Group1List />
    case 'Group2List':
      return <Group2List />
    case 'Group3List':
      return <Group3List />
    case 'ServerData':
      return <ServerData />
    default:
      return <QuestionList />
  }
}

export default Control
