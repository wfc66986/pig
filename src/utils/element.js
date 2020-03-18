import Vue from 'vue'
import {
    Message,
    Form,
    FormItem,
    DatePicker,
    Select,
    Option,
    Input,
    Checkbox,
    Button,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Scrollbar,
    Row,
    Col,
    Table,
    TableColumn,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Dialog,
    Tree,
    Tabs,
    TabPane,
    MessageBox,
    Radio,
    RadioGroup,
    Switch,
    TimePicker,
    Steps,
    Step,
    upload,
    Notification,
    Pagination,
    autocomplete,
    Card,
    Popover,
    popconfirm,

} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(Steps)
Vue.use(Step)
Vue.use(upload)
Vue.use(autocomplete)
Vue.use(Card)
Vue.use(Popover)
Vue.use(popconfirm)

Vue.use(Pagination)

Vue.component(CollapseTransition.name, CollapseTransition)
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.confirm = MessageBox.confirm;


Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
