import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import products from './models/products';
import shopping_cart from './models/shopping_cart'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(products);
app.model(shopping_cart)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
