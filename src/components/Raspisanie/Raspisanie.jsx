import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Raspisanie.css';

import { addOrder } from '../../model/model';

import Order from '../Order/Order';
import { addOrderAction } from '../../store/actions';


class Florist extends PureComponent {

    onOrderAdd = async () => {
        let orderName = prompt('Введите название остановки', '');
        if (!orderName || !orderName.trim()) {
            alert('Невалидное название остановки!');
            return;
        }
        orderName = orderName.trim();

        let orderAuthor = prompt('Введите время прибытия', '').trim();
        if (!orderAuthor || !orderAuthor.trim()) {
            alert('Невалидное время!');
            return;
        }

        orderAuthor = orderAuthor.trim();
        const newOrderData = {
            order: {
                name: orderName,
                author: orderAuthor
            },
            orderArrId: this.props.orderArrId
        };

        await addOrder(newOrderData);
        this.props.addOrderDispatch(newOrderData);
    }

    render() {
        const orderArrId = this.props.orderArrId;
        const orderArr = this.props.florists[orderArrId];

        return (
        <div className="orderarr">
            <header className="orderarr-name">
                { orderArr.name }
            </header>
            <div className="orderarr-orders">
                {orderArr.orders.map((order, index) => (
                    <Order key={`order-${index}`} orderId={index} orderArrId={orderArrId} />
                ))}
            </div>
            <footer className="orderarr-add-task" onClick={this.onOrderAdd}>
                Добавить остановку
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ florists }) => ({ florists });

const mapDispatchToProps = dispatch => ({
    addOrderDispatch: ({ order, orderArrId }) => dispatch(addOrderAction({ order, orderArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Florist);
