import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  //  Server
  //
  v_URL: '',
  v_Server: '',
  //
  //  State
  //
  v_Page: 'QuestionList',
  v_PagePrevious: '',
  //
  //  Data
  //
  v_Questions: [],
  v_Hands: [],
  v_Bidding: [],
  v_RefLinks: [],
  v_Owner: [],
  v_Group1Owner: [],
  v_Group2: [],
  v_Group3: [],
  //
  //  Options
  //
  v_OptionsOwner: [],
  v_OptionsRefLinks: [],
  v_OptionsGroup1: [],
  v_OptionsGroup2: [],
  v_OptionsGroup3: []
})

export { ValtioStore }
