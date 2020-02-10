
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')


var option = document.getElementById('select-box');
var UserValue = option.options[option.selectedIndex];

var optionCount = document.getElementById('select-count');
var UserCount = optionCount.options[optionCount.selectedIndex];

const btn= document.getElementById('bt')
//Get the button:
mybutton = document.getElementById("myBtn");
mybuttonPrint = document.getElementById("myBtnPrint");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    mybuttonPrint.style.display = "block";
  } else {
    mybutton.style.display = "none";
    mybuttonPrint.style.display = "none";
  }
}
// Pring to PDF 
function print(doc) {
    var objFra = document.createElement('iframe');   // Create an IFrame.
    objFra.style.visibility = "hidden";    // Hide the frame.
    objFra.src = doc;                      // Set source.
    document.body.appendChild(objFra);  // Add the frame to the web page.
    objFra.contentWindow.focus();       // Set focus.
    objFra.contentWindow.print();      // Print it.
}
//search Function
 function search(searchTerm, UserValue, userCount) {
    return fetch(`https://api.fda.gov/drug/label.json?search=${searchTerm}+AND+openfda.product_type:${UserValue}&limit=${userCount}`)
    .then(res => res.json()) 
    .then(data => data.results.map(data =>data))
    .catch(err => console.log(err, console.log("The Drug Not Found"))); 
    
}
// form event listener
searchForm.addEventListener('submit', e=> {
    if (UserValue === 'prescription') {
        UserValue='prescription'
    }
    if (UserValue === 'otc') {
        UserValue='otc'
    }
    if(UserCount === '1') {
        UserCount=1
    }
    if(UserCount === '5') {
        UserCount=5
    }
    if(UserCount === '10') {
        UserCount= 10
    }
    if(UserCount === '20') {
        UserCount= 20
    }
    
    // get search term
    const searchTerm = searchInput.value;
    const userSelected = option.value;
    const userCount = optionCount.value;

    console.log(searchTerm, userSelected,userCount )

    // check input 
    if(searchTerm === '') {
        alert('Please add a search term')
    }
    else if (userSelected === '') {
        alert('Please select a drug type')
    }
    else if (userCount === '') {
        alert('Please select quantity')
    }
    // clear form
    document.getElementById("search-form").reset();
   
    //Search FDA
    search(searchTerm, userSelected, userCount)
        .then(results => {
            
            console.log(results)
            let output = '<div class="container">';
            
           
            //loop thru meds                                                                                                                                               
            results.forEach(result => {
                if(userSelected === 'prescription') {
                    output += `
                    <div>
                    <dl class="row">
                    <dt class="col-sm-3 h4"><div class="p-3 mb-2 text-white" style="background-color: #DE7B3A; color: #ffffff;">Brand Name:</div></dt>
                        <dd class="col-sm-9 h4 text-info">
                        <div class="p-3 mb-2 text-white" style="background-color: #3d5165;">${result.openfda.brand_name}</div>
                        </dd>
                        
                        <dt class="col-sm-3">Product NDC:</dt>
                        <dd class="col-sm-9">${result.openfda.product_ndc}</dd>

                        <dt class="col-sm-3">Generic Name:</dt>
                        <dd class="col-sm-9">${result.openfda.generic_name}</dd>
                        
                        <dt class="col-sm-3">Effective Date:</dt> 
                        <dd class="col-sm-9">${result.effective_time}</dd>

                        <dt class="col-sm-3">Manufacturer Name:</dt>
                        <dd class="col-sm-9">${result.openfda.manufacturer_name}</dd>

                        <dt class="col-sm-3">Description:</dt>
                        <dd class="col-sm-9">${result.description} </dd>

                        <dt class="col-sm-3 ">Geriatric Use:</dt>
                        <dd class="col-sm-9">${result.geriatric_use}</dd>

                        <dt class="col-sm-3">Indications and Usage:</dt>
                        <dd class="col-sm-9">${result.indications_and_usage}</dd>

                        <dt class="col-sm-3 ">Clinical Studies:</dt>
                        <dd class="col-sm-9">${result.clinical_studies}</dd>
                        
                        <dt class="col-sm-3">Clinical Studies Table:</dt>
                        <dd class="col-sm-9">
                        <table class="table"> ${result.clinical_studies_table}</table>
                        </dd>

                        <dt class="col-sm-3">Dosage and administration:</dt>
                        <dd class="col-sm-9">${result.dosage_and_administration}</dd>

                        <dt class="col-sm-3 ">Adverse Reactions:</dt>
                        <dd class="col-sm-9">${result.adverse_reactions}</dd>
 
                        <dt class="col-sm-3 ">Clinical Pharmacology:</dt>
                        <dd class="col-sm-9">${result.clinical_pharmacology}</dd>

                        <dt class="col-sm-3">Overdosage:</dt>
                        <dd class="col-sm-9">${result.overdosage} </dd>
                    </dl>
                   </div>
                   <hr>
               `;
               output+= '</div>';
                }
                if(userSelected === 'otc') {
                    output += `

                    <dl class="row">
                        <dt class="col-sm-3 h4"><div class="p-3 mb-2 text-white" style="background-color: #DE7B3A; color: #ffffff;">Brand Name:</div></dt>
                        <dd class="col-sm-9 h4 text-info">
                        <div class="p-3 mb-2 text-white" style="background-color: #3d5165;">${result.openfda.brand_name}</div>
                        </dd>
                        <dt class="col-sm-3">Product NDC:</dt>
                        <dd class="col-sm-9">${result.openfda.product_ndc}</dd>

                        <dt class="col-sm-3">Effective Date:</dt> 
                        <dd class="col-sm-9">${result.effective_time}</dd>

                        <dt class="col-sm-3">Generic Name:</dt>
                        <dd class="col-sm-9">${result.openfda.generic_name}</dd>

                        <dt class="col-sm-3">Manufacturer Name:</dt>
                        <dd class="col-sm-9">${result.openfda.manufacturer_name}</dd>

                        <dt class="col-sm-3">Purpose:</dt>
                        <dd class="col-sm-9">${result.purpose}</dd>

                        <dt class="col-sm-3">Warnings:</dt>
                        <dd class="col-sm-9">${result.warnings} </dd>

                        <dt class="col-sm-3">Inactive Ingredient:</dt>
                        <dd class="col-sm-9">${result.inactive_ingredient} </dd>

                        <dt class="col-sm-3">Clinical Studies:</dt>
                        <dd class="col-sm-9"> ${result.active_ingredient}</dd>

                        <dt class="col-sm-3">Dosage and administration:</dt>
                        <dd class="col-sm-9">${result.dosage_and_administration}</dd>

                    </dl>
                   <hr>    
               `;
               
               output+= '</div>';
                }
                
                document.getElementById('results').innerHTML = output;                           
            })
   
        })
    e.preventDefault()
});


