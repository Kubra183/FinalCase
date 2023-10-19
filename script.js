let Sorular = [];
let ui = new UI();
let kategori = ui.btn_Bilisim.getAttribute("name");
let quiz = new Quiz(sorulariyukle(kategori));

ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
});

ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btn_next.classList.remove("show");
    } else {
        console.log("quiz bitti");
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

ui.btn_quit.addEventListener("click", function() {
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});

ui.btn_Bilisim.addEventListener("click",function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
    let kategori = ui.btn_Bilisim.getAttribute("name");
    sorulariyukle(kategori);
});

ui.btn_Genel.addEventListener("click",function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
    let kategori = ui.btn_Genel.getAttribute("name");
    sorulariyukle(kategori);
});

ui.btn_Bilim.addEventListener("click",function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
    let kategori = ui.btn_Bilim.getAttribute("name");
    sorulariyukle(kategori);
});


function optionSelected(option) {
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.btn_next.classList.add("show");
}

function sorulariyukle(kategori) {
    fetch("http://localhost:3000/"+kategori)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw 'Error getting users list'
        }
    })
    .then(data=>{
        Sorular = [];

        for(let i=0;i<4;i++){
          console.log(data[i].soruMetni);  
          let soru =  new Soru(data[i].soruMetni, 
                                data[i].cevapSecenekleri, 
                                data[i].dogruCevap
                              );  
          Sorular.push(soru);
        } 
        quiz = new Quiz(Sorular);
        ui.soruGoster(quiz.soruGetir());
    })
    .catch(err=>{
        alert("Server kapalı json-server açınız.");    
        console.log(err)
    })
    
}


