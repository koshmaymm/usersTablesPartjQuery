$(document).ready(function () {
    var box = {};
    $("#addId").click(function () {
        box.createNewTableRow();
    });
    box.createNewTableRow = function () {
        var row = $('<tr>');
        var tdName = $('<td>');
        tdName.append($("#personName").val());
        if ($("#personName").val() === "") {
            console.log("You don't added your name");
            return;
        }
        var arrproperties = [checkPersonSuperPower.checked, checkPersonRich.checked, checkPersonGenius.checked];
        var tdSuperPover = box.createNewTableParam(arrproperties[0]);
        var tdRich = box.createNewTableParam(arrproperties[1]);
        var tdGenius = box.createNewTableParam(arrproperties[2]);
        arrproperties.unshift($("#personName").val());
        localStorage.setItem(arrproperties[0], arrproperties[1] + "," + arrproperties[2] + "," + arrproperties[3])
        var tdDelete = box.createNewDeleteButton();
        row.append(tdName);
        row.append(tdSuperPover);
        row.append(tdRich);
        row.append(tdGenius);
        row.append(tdDelete);
        $("#tableBody").append(row);
        box.clearInputs();
        box.checkButtonsDelete();
    }
    box.createNewTableParam = function (prop) {
        var td = document.createElement("td");
        td.append(prop);
        return td;
    }
    box.clearInputs = function (e) {
        $("#personName").val("");
        $('input:checked').prop('checked', false);
        box.countingPersons();
    }
    box.countingPersons = function () {
        $("#persons").html("Total Persons: " + ($("tr").length - 1));
    }
    box.createNewDeleteButton = function () {
        var but = $('<td><input type="button" value="DELETE" class="deleteButtons"></td>');
        return but;
    }
    box.checkButtonsDelete = function () {
        $(".deleteButtons").click(function (e) {
            localStorage.removeItem(e.target.parentNode.parentNode.firstChild.textContent);
            $(this).parent().parent().remove();
            box.countingPersons();
            //console.log($(this).parent().parent().eq(0).val());
            // can not solve the problem myself
        });
    }
    box.sortTable = function (e) {
        var columnSort = e.target;
        switch (columnSort) {
        case sort1:
            var cellNamber = 0
                , paramA = 1
                , paramB = -1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML > rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort2:
            var cellNamber = 1
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort3:
            var cellNamber = 2
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort4:
            var cellNamber = 3
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        }
        var tbody = $('tbody')[0];
        var rowsArray = [].slice.call(tbody['rows']);
        rowsArray.sort(compare);
        table.removeChild(tbody);
        for (var i = 0; i < rowsArray.length; i++) {
            tbody.append(rowsArray[i]);
        }
        table.append(tbody);
        box.hideCells(cellNamber, tbody);
    }
    box.createTable = function (dataLS) {
        var row = $('<tr>');
        var nameLS = box.createNewTableParam(dataLS[0]);
        var paramSuperPowerLS = box.createNewTableParam(dataLS[1]);
        var richParamLS = box.createNewTableParam(dataLS[2]);
        var geniusParamLS = box.createNewTableParam(dataLS[3]);
        var buttonDeleteLS = box.createNewDeleteButton();
        row.append(nameLS);
        row.append(paramSuperPowerLS);
        row.append(richParamLS);
        row.append(geniusParamLS);
        row.append(buttonDeleteLS);
        $("#tableBody").append(row);
        box.countingPersons();
        box.checkButtonsDelete();
    }
    $(".sortButtons").click(function (e) {
        box.sortTable(e);
    });
    box.getDataFromLocalStorageData = function () {
        var localStorageData = localStorage;
        for (var i = 0; i < localStorageData.length; i++) {
            var keyName = localStorageData.key(i);
            var localStorageDataKeyNameParam = localStorageData[keyName].split(',');
            localStorageDataKeyNameParam.unshift(keyName);
            box.createTable(localStorageDataKeyNameParam);
        }
    }
    box.checkStorage = function () {
        if (localStorage.length > 0) {
            box.getDataFromLocalStorageData();
        }
        else {
            console.log("localStorage is empty")
        }
    }
    box.checkStorage();
    box.hideCells = function (a, b) {
        box.showAllCells();
        for (var i = 1, k = b.childNodes.length; i < k; i++) {
            if (b.childNodes[i].childNodes[a].textContent === 'false') {
                b.childNodes[i].className = "hidenCells";
            };
        }
    }
    box.showAllCells = function () {
        $(".hidenCells").removeClass('hidenCells');
    }
});