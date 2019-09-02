var ctrlKeys = false;
var ctrlCrypt = false;
var ctrlDecrypt = false;

function toggleKeys() {
    $('#informar').collapse('toggle');
    $('#gerar').collapse('toggle');
    if (ctrlKeys) {
        $('#no-generate').addClass("text-black");
        $('#generate').removeClass('text-danger');
        $("#gerar-chaves").val('on');
        ctrlKeys = false;
    } else {
        $('#generate').addClass('text-danger');
        $('#no-generate').removeClass('text-black');
        $("#gerar-chaves").val('off');
        ctrlKeys = true;
    }
}

function toggleCrypt() {
    if (ctrlCrypt) {
        $('#no-ascii-info').text(' INFORME APENAS LETRAS MAIÚSCULAS (A-Z) E ESPAÇOS, SEM ACENTOS');
        $('#no-ascii-info-danger').text('ATENÇÃO:');
        $('#no-ascii-crypt').addClass("text-black");
        $('#ascii-crypt').removeClass('text-danger');
        $("#use-ascii-crypt").val('on');
        ctrlCrypt = false;
    } else {
        $('#no-ascii-info').text('');
        $('#no-ascii-info-danger').text('');
        $('#ascii-crypt').addClass('text-danger');
        $('#no-ascii-crypt').removeClass('text-black');
        $("#use-ascii-crypt").val('off');
        ctrlCrypt = true;
    }
}

function toggleDecrypt() {
    $('#informar').collapse('toggle');
    if (ctrlDecrypt) {
        $('#no-ascii-decrypt').addClass("text-black");
        $('#ascii-decrypt').removeClass('text-danger');
        $("#use-ascii-decrypt").val('on');
        ctrlDecrypt = false;
    } else {
        $('#ascii-decrypt').addClass('text-danger');
        $('#no-ascii-decrypt').removeClass('text-black');
        $("#use-ascii-decrypt").val('off');
        ctrlDecrypt = true;
    }
}

function limpaTxtCrypt() {
    $('#txt-crip').removeAttr("readonly");
    $('#txt-crip').val("");
    $('#load-file').val("");
    $('#num-e-crip').val("");
    $('#num-n-crip').val("");
    $('#num-e-crip').removeAttr("readonly");
    $('#num-n-crip').removeAttr("readonly");
    $('#load-file-key').val("");
    $('#load-file-label').text("Escolha um arquivo");
    $('#load-file-key-label').text("Escolha um arquivo");
}

function limpaTxtDecrypt() {
    $('#txt-decrip').removeAttr("readonly");
    $('#num-p-dec').removeAttr("readonly");
    $('#num-q-dec').removeAttr("readonly");
    $('#num-e-dec').removeAttr("readonly");
    $('#txt-decrip').val("");
    $('#num-p-dec').val("");
    $('#num-q-dec').val("");
    $('#num-e-dec').val("");
    $('#load-file-dec').val("");
    $('#load-file-label-dec').text("Escolha um arquivo");
    $('#load-file-key-dec').val("");
    $('#load-file-label-key-dec').text("Escolha um arquivo");
}


//Funções para abrir arquivos
function abreArquivo(arq){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('load-file');
        //Seta uma extensão
        var fileExtension = /text.*/;
        //Pega o arquivo
        var fileTobeRead = fileSelected.files[0];
        //Verifica se a extensão é compatível
        if (fileTobeRead.type.match(fileExtension)) {
            $('#load-file-label').text(fileTobeRead.name);
            //Inicializa o objeto fileReader
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                $('#txt-crip').val(fileReader.result);
            };
            fileReader.readAsText(fileTobeRead);
            $('#txt-crip').attr("readonly","true");
        }
        else {
            $('#crypt-error').text("Por favor, selecione um arquivo .TXT!");
        }
    }
    else {
        alert("Seu navegador não suporta upload ou leitura de arquivos");
    }
}

function abreArquivoKey(arq){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('load-file-key');
        //Seta uma extensão
        var fileExtension = /text.*/;
        //Pega o arquivo
        var fileTobeRead = fileSelected.files[0];
        //Verifica se a extensão é compatível
        if (fileTobeRead.type.match(fileExtension)) {
            $('#load-file-key-label').text(fileTobeRead.name);
            //Inicializa o objeto fileReader
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var keys = fileReader.result;
                for(var i=0;i<keys.length;i++){
                    if(!(keys.charCodeAt(i)>=48 && keys.charCodeAt(i)<=57)){
                        var e = keys.slice(0,i);
                        var n = keys.slice(i+1,keys.length);
                    }
                }
                $('#num-e-crip').val(e);
                $('#num-n-crip').val(n);
            };
            fileReader.readAsText(fileTobeRead);
            $('#num-e-crip').attr("readonly","true");
            $('#num-n-crip').attr("readonly","true");
        }
        else {
            $('#crypt-key-error').text("Por favor, selecione um arquivo .TXT!");
        }
    }
    else {
        alert("Seu navegador não suporta upload ou leitura de arquivos");
    }
}

function abreArquivoDec(arq){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('load-file-dec');
        //Seta uma extensão
        var fileExtension = /text.*/;
        //Pega o arquivo
        var fileTobeRead = fileSelected.files[0];
        //Verifica se a extensão é compatível
        if (fileTobeRead.type.match(fileExtension)) {
            $('#load-file-label-dec').text(fileTobeRead.name);
            //Inicializa o objeto fileReader
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                $('#txt-decrip').val(fileReader.result);
            };
            fileReader.readAsText(fileTobeRead);
            $('#txt-decrip').attr("readonly","true");
        }
        else {
            $('#decrypt-error').text("Por favor, selecione um arquivo .TXT!");
        }
    }
    else {
        alert("Seu navegador não suporta upload ou leitura de arquivos");
    }
}


function abreArquivoKeyDec(arq){
    var i1=-1,i2=-1;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('load-file-key-dec');
        //Seta uma extensão
        var fileExtension = /text.*/;
        //Pega o arquivo
        var fileTobeRead = fileSelected.files[0];
        //Verifica se a extensão é compatível
        if (fileTobeRead.type.match(fileExtension)) {
            $('#load-file-key-dec-label').text(fileTobeRead.name);
            //Inicializa o objeto fileReader
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var keys = fileReader.result;
                for(var i=0;i<keys.length;i++){
                    if(!(keys.charCodeAt(i)>=48 && keys.charCodeAt(i)<=57)){
                        if(i1==-1) i1=i;
                        else i2=i;
                    }
                }
                var p = keys.slice(0,i1);
                var q = keys.slice(i1+1, i2);
                var e = keys.slice(i2+1, keys.length);
                $('#num-q-dec').val(q);
                $('#num-p-dec').val(p);
                $('#num-e-dec').val(e);
            };
            fileReader.readAsText(fileTobeRead);
            $('#num-p-dec').attr("readonly","true");
            $('#num-q-dec').attr("readonly","true");
            $('#num-e-dec').attr("readonly","true");
        }
        else {
            $('#crypt-key-error').text("Por favor, selecione um arquivo .TXT!");
        }
    }
    else {
        alert("Seu navegador não suporta upload ou leitura de arquivos");
    }
}

function salvarArquivo(field,titulo) {
    var texto = document.getElementById(field).innerText;
    var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    saveAs(blob, titulo + ".txt");
}

function ehPrimo(field) {
    var num = $('#'+field).val();
    var a, b;
    if (num<23)
    {
        confirmaPrimo(5,field);
        return 0;
    }
    else if (num<=1 || num%2==0 || num%3==0)
    {
        confirmaPrimo(0,field);
        return 0;
    }
    else{
        for(var i=2;i<num/2;i++)
        {
            if(num%i==0)
            {
                confirmaPrimo(0,field);
                return 0;
            }
        }
        confirmaPrimo(1,field);
        return 1;
    }
}

function mdc(field){
    var num = $('#'+field).val();
    var p = $('#num-p').val();
    var q = $('#num-q').val();
    if(p==0 || q==0){
        confirmaPrimo(2,field);
        return 0;
    }
    if(ehPrimo('num-p')==0 || ehPrimo('num-q')==0){
        confirmaPrimo(3,field);
        return 0;
    }
    else if(num>1){
        var aux,phi = (p-1)*(q-1);
        while(phi){
            aux = phi;
            phi = num%phi;
            num = aux;
        }
        if(num==1){
            confirmaPrimo(1,field);
            return 1;
        }
        else{
            confirmaPrimo(4,field);
            return 0;
        }
    }
    else{
        confirmaPrimo(4,field);
        return 0;
    }
}

function confirmaPrimo(success,field) {
    if(success==1){
        $('#'+field+'-label').removeClass('text-danger');
        $('#'+field+'-label').addClass('text-success');
        $('#'+field+'-label').text("VERIFICADO");
    }
    else if(success==0){
        $('#'+field+'-label').removeClass('text-success');
        $('#'+field+'-label').addClass('text-danger');
        $('#'+field+'-label').text("NÃO É PRIMO");
    }
    else if(success==2){
        $('#'+field+'-label').removeClass('text-success');
        $('#'+field+'-label').addClass('text-danger');
        $('#'+field+'-label').text("INFORME P E Q");
    }
    else if(success==3){
        $('#'+field+'-label').removeClass('text-success');
        $('#'+field+'-label').addClass('text-danger');
        $('#'+field+'-label').text("P OU Q INFORMADO(S) INCORRETAMENTE");
    }
    else if(success==4){
        $('#'+field+'-label').removeClass('text-success');
        $('#'+field+'-label').addClass('text-danger');
        $('#'+field+'-label').text("E NÃO É RELATIVAMENTE PRIMO A (P-1)(Q-1)");
    }
    else if(success==5){
        $('#'+field+'-label').removeClass('text-success');
        $('#'+field+'-label').addClass('text-danger');
        $('#'+field+'-label').text("DEVE SER MAIOR OU IGUAL A 23");
    }
}

var gerado = 0;

function geraChave() {
    if($("#gerar-chaves").val()=='on') {
        if (ehPrimo('num-p') && ehPrimo('num-q') && mdc('num-e')) {
            $.post("generate-keys", "&p=" + $("#num-p").val()+"&q="+$("#num-q").val()+"&e=" + $("#num-e").val()+"&opt=1", function (response) {
                $('#public-key').append(response.e);
                $('#public-key').append(" ");
                $('#public-key').append(response.n);
                $("#generate-keys-title").text("CHAVE PÚBLICA");
                $("#generate-keys-subtitle").text("AQUI ESTÁ A SUA CHAVE PÚBLICA:");
                $("#generate-keys-obs").text("ANOTE OU FAÇA DOWNLOAD");
                $('#generate-keys-in').collapse('toggle');
                $('#generate-keys-out').collapse('toggle');
            });
        }
        else {
            alert("Verifique os números digitados!");
        }
    }
    else{
        if(gerado == 1) {
            $.post("generate-keys", "&p=" + $("#num-p").val() + "&q=" + $("#num-q").val() + "&e=" + $("#num-e").val() + "&opt=1", function (response) {
                $('#public-key').text("");
                $('#public-key').append(response.e);
                $('#public-key').append(" ");
                $('#public-key').append(response.n);
                $("#generate-keys-title").text("CHAVE PÚBLICA");
                $("#generate-keys-subtitle").text("AQUI ESTÁ A SUA CHAVE PÚBLICA: (RESPECTIVAMENTE: E E N).");
                $("#generate-keys-obs").text("ANOTE OU FAÇA DOWNLOAD");
                $('#generate-keys-in').collapse('toggle');
                $('#generate-keys-out').collapse('toggle');
            });
        }
        else if(gerado==0) {
            $.post("generate-keys", "&tam=" + $("#nums-size").val() + "&opt=0", function (response) {
                $("#num-p").val(response.p);
                $("#num-q").val(response.q);
                $("#num-e").val(response.e);
                $("#private-key").append(response.p);
                $("#private-key").append(" ");
                $("#private-key").append(response.q);
                $("#private-key").append(" ");
                $("#private-key").append(response.e);
                $("#generate-keys-subtitle").text("AQUI ESTÁ A SUA CHAVE PRIVADA (RESPECTIVAMENTE: P, Q E E). ANOTE OU FAÇA DOWNLOAD E CLIQUE PARA GERAR A CHAVE PÚBLICA");
                $("#private-key-txt").collapse('toggle');
                $('#informar').collapse('toggle');
                $('#gerar').collapse('toggle');
                gerado = 1;
            });
        }
    }
}

function criptografar() {
    if($("#txt-crip").val()!=""){
        var txt = $("#txt-crip").val();
        var e = $("#num-e-crip").val();
        var n = $("#num-n-crip").val();
        var flag = 0;
        if($("#use-ascii-crypt").val()=='on') {
            for(i=0;i<txt.length;i++){
                if(!((txt.charCodeAt(i)>=65 && txt.charCodeAt(i)<=90) || txt.charCodeAt(i)==32)){
                    alert("Digite apenas letras maiúsculas e espaços");
                    flag = 1;
                    break;
                }
            }
            if(!flag)
            {
                $.post("encrypt", "&txt=" + txt + "&e=" + e + "&n=" + n + "&opt=1", function (response) {
                    $('#crypt-text').text(response.crypt);
                    $('#crypt-in').collapse('toggle');
                    $('#crypt-out').collapse('toggle');
                });
            }
        }
        else{
            $.post("encrypt", "&txt=" + txt + "&e=" + e + "&n=" + n + "&opt=0", function (response) {
                $('#crypt-text').text(response.crypt);
                $('#crypt-in').collapse('toggle');
                $('#crypt-out').collapse('toggle');
            });
        }
    }
    else{
        alert("Informe um texto a ser criptografado")
    }

}

function descriptografar() {
    if($("#txt-decrip").val()!=""){
        if($("#num-p-dec").val()!="" && $("#num-q-dec").val()!="" && $("#num-e-dec").val()!=""){
            var txt = $("#txt-decrip").val();
            var p = $("#num-p-dec").val();
            var q = $("#num-q-dec").val();
            var e = $("#num-e-dec").val();
            if($("#use-ascii-decrypt").val()=='on') {
                $.post("decrypt", "&txt=" + txt + "&p=" + p + "&q=" + q + "&e=" + e +"&opt=1", function (response) {
                    $('#decrypt-text').text(response.decrypt);
                    $('#decrypt-in').collapse('toggle');
                    $('#decrypt-out').collapse('toggle');
                });
            }
            else{
                $.post("decrypt", "&txt=" + txt + "&p=" + p + "&q=" + q + "&e=" + e +"&opt=0", function (response) {
                    $('#decrypt-text').text(response.decrypt);
                    $('#decrypt-in').collapse('toggle');
                    $('#decrypt-out').collapse('toggle');
                });
            }
        }
        else{
            alert("Informe P, Q e E");
        }
    }
    else{
        alert("Informe uma mensagem a ser decriptografada")
    }
}