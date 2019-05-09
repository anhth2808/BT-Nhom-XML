
const checkQuery = () => {
    
}

const switchOt = (query3, phongBanQueryOt3) => {
    
    
}

document.addEventListener("DOMContentLoaded", () => {
    const Query3 = document.getElementById("query3");
    const QueryOt3 = document.getElementById("queryOt3");
    const Ot3List = document.getElementsByClassName("ot3");
    if (Query3.value === "chucVu") {
        for (let i = 0; i < Ot3List.length; i++) {
            if (Ot3List[i].classList.contains("phongBan")) {
                Ot3List[i].style.display = "none";
            }
            if (Ot3List[i].classList.contains("chucVu")) {
                Ot3List[i].style.display = "block";
            }
        }
    } else if (Query3.value === "phongBan") {
        for (let i = 0; i < Ot3List.length; i++) {
            if (Ot3List[i].classList.contains("chucVu")) {
                Ot3List[i].style.display = "none";
            }
            if (Ot3List[i].classList.contains("phongBan")) {
                Ot3List[i].style.display = "block";
            }
        }
        
    }
    

    Query3.addEventListener("change", (e) => {
        const selectedQuery = e.target.value;
        
        if (selectedQuery === "chucVu") {
            QueryOt3.selectedIndex = 0;
            for (let i = 0; i < Ot3List.length; i++) {
                if (Ot3List[i].classList.contains("phongBan")) {
                    Ot3List[i].style.display = "none";
                }
                if (Ot3List[i].classList.contains("chucVu")) {
                    Ot3List[i].style.display = "block";
                }
            }
        } else if (selectedQuery === "phongBan") {
            QueryOt3.selectedIndex = 0;
            for (let i = 0; i < Ot3List.length; i++) {
                if (Ot3List[i].classList.contains("chucVu")) {
                    Ot3List[i].style.display = "none";
                }
                if (Ot3List[i].classList.contains("phongBan")) {
                    Ot3List[i].style.display = "block";
                }
            }
            
        }
    });
});



