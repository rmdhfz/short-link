import $ from "jquery";
import '../component/List.js';
import "../component/Search.js";
import Source from "../source/Source.js";
import moment from "moment";

const main = () => {

    const displayTime = () => {
        moment.locale("id");
        document.querySelector(".time").text(moment().format("LTS")+moment().format("LL"));
    };

    const updateTime = () => {
        displayTime();
        setTimeout(updateTime, 1000)
    };

    updateTime();

    const searchElement = document.querySelector("search-bar"), movieListElement = document.querySelector("movie-list");

    const onButtonSearchClicked = async () => {
        let searchValue = searchElement.value;
        if (searchValue) {
            try {
                const res = await Source.searchMoive(searchValue);
                renderResult(res);
            } catch (rejectedReason) {
                fallbackResult(rejectedReason);
            }   
        }else{
            alert("required value");
        }
    };

    const renderResult = (results) => {
        movieListElement.movies = results;
    };

    const fallbackResult = (message) => {
        movieListElement.renderError(message);
    };
    searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
