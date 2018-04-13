$(function() {
    var coffeeOrders;
    var orderID;

    if (!localStorage.getItem('coffeeOrdersStorage')) {
        coffeeOrders = [];
    }
    else {
        coffeeOrders = JSON.parse(localStorage.getItem('coffeeOrdersStorage'));
        renderOrders();
    }

    if (!localStorage.getItem('orderIDStorage')) {
        orderID = 1;
    }
    else {
        orderID = localStorage.getItem('orderIDStorage');
    }

    function renderOrders() {
        var renderedHTML = '<table class="table table-striped"><thead><tr><th>#</th><th>Description</th><th>Email</th><th>Size</th><th>Flavor</th><th>Strength</th><th></th></tr></thead><tbody>';

       coffeeOrders.forEach(function(order) {
            renderedHTML += '<tr data-id=' + order.id + '>';
            renderedHTML += '<td>' + order.id + '</td>';
            renderedHTML += '<td>' + order.description + '</td>';
            renderedHTML += '<td>' + order.email + '</td>';
            renderedHTML += '<td>' + order.size + '</td>';
            renderedHTML += '<td>' + order.flavorShot + '</td>';
            renderedHTML += '<td>' + order.strengthLevel + '</td>';
            renderedHTML += '<td class="delete">&#10005;</td></tr>'
        });

        renderedHTML += '</tbody></table>';

        if (coffeeOrders.length == 0) {
            renderedHTML = '<p>No orders at the moment!</p>';
        }

        $('#orderList').html(renderedHTML);

    }

    function removeOrder(id) {
        coffeeOrders = coffeeOrders.filter(function(order) {
            return order.id !== id;
        });
        localStorage.setItem('coffeeOrdersStorage', JSON.stringify(coffeeOrders));
    } 

    $('form').submit(function(e) {
        e.preventDefault();
        var coffeeOrder = {};

        coffeeOrder.id = orderID++;
        coffeeOrder.description = $('#coffeeOrder').val();
        coffeeOrder.email = $('#emailInput').val();
        coffeeOrder.size = $('input:checked').val();
        coffeeOrder.flavorShot = $('#flavorShot').val();
        coffeeOrder.strengthLevel = $('#strengthLevel').val();

        coffeeOrders.push(coffeeOrder);
        localStorage.setItem('coffeeOrdersStorage', JSON.stringify(coffeeOrders));
        localStorage.setItem('orderIDStorage', orderID);

        renderOrders();

    });

    $('#orderList').on('click', '.delete', function(e) {
        var id = $(this).parent().data('id');
        removeOrder(id);
        renderOrders();
    })

});