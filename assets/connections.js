(function(window, document) {
        "use strict";
        const apihost = document.querySelector("#apihost");
        const connectBtn = document.querySelector("#connect");
        const saveBtn = document.querySelector("#saveconnection");
        const connections = document.querySelector("#connections");
        const setStore = (newStore) => {
                window.localStorage.setItem("GRAPHQL_API_HOSTS", JSON.stringify(newStore));
        }
        const getStore = () => {
                let store = window.localStorage.getItem("GRAPHQL_API_HOSTS");
                if (!store) {
                        store = [];
                } else  {
                        store = JSON.parse(store);
                }
                return store;
        };
        const addToStore = (item) => {
                const store = getStore();
                store.push(item);
                setStore(store);
                refreshConnections();
                return store;
        };
        const deleteFromStoreAtIndex = function(index) {
                const i = parseInt(index, 10);
                const store = getStore();
                store.splice(i, 1);
                setStore(store);
                refreshConnections();
        };
        const deleteFunc = function(i) {
                deleteFromStoreAtIndex(i);
        };
        const connectFunc = function(h) {
                window.localStorage.setItem("GRAPHQL_API_HOST", h);
                window.location.href = "explore.html";
        };
        const refreshConnections = function() {
                const store = getStore();
                connections.innerHTML = "";
                store.forEach((item, i) => {
                        const li = document.createElement("li");
                        const text = document.createElement("span");
                        text.className = "text";
                        const deleteBtn = document.createElement("span");
                        deleteBtn.className = "delete";
                        text.innerHTML = item.text;
                        deleteBtn.innerHTML = "X";
                        text.addEventListener("click", function(){
                                connectFunc(this.parentNode.getAttribute("data-apihost"));
                        });
                        deleteBtn.addEventListener("click", function(){
                                deleteFunc(this.parentNode.getAttribute("data-index"));
                        });
                        li.setAttribute("data-apihost", item.value);
                        li.setAttribute("data-index", i);
                        li.appendChild(text);
                        li.appendChild(deleteBtn);
                        connections.appendChild(li);
                });
        };
        saveBtn.addEventListener("click", function(evt) {
                evt.preventDefault();
                addToStore({text: apihost.value, value: apihost.value});
        });
        connectBtn.addEventListener("click", (evt) => {
                evt.preventDefault();
                connectFunc(apihost.value);
        });
        refreshConnections();
})(window, document)
