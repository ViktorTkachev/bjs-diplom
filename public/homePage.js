const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(request => {
    if (request.success) {
      location.reload();
    }
  })
}

ApiConnector.current(request => {
  if (request.success) {
    ProfileWidget.showProfile(request.data);
  }
});

const ratesBoard = new RatesBoard();

const getRates = () => {
  ApiConnector.getStocks((request) => {
    if(request.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(request.data);
      console.log(request.data)
    }
  });
}

getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (obj) => {
  ApiConnector.addMoney(obj, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, 'Деньги были добавлены');
      } else {
        moneyManager.setMessage(false, response.error);
      }
    });
}

moneyManager.conversionMoneyCallback = (obj) => {
  ApiConnector.convertMoney(obj, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Деньги были конвертированы');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
}

moneyManager.sendMoneyCallback = (obj) => {
  ApiConnector.transferMoney(obj, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Деньги были отправлены');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if(response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (obj) => {
  ApiConnector.addUserToFavorites(obj, response => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Пользователь был добавлен');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Пользователь был удален');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}
