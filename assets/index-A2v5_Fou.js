(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function p(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.getElementById("cards-list"),i=document.getElementById("card-details"),r=document.createElement("input"),p=document.querySelector(".container h1"),e=document.querySelector(".container");r.type="text",r.id="search-input",r.placeholder="Enter card name",p.insertAdjacentElement("afterend",r);async function n(){try{let g=function(m){l.innerHTML="",m.forEach(d=>{const a=document.createElement("li");a.textContent=d.name,a.addEventListener("click",()=>c(d.id.card)),l.appendChild(a)})};var o=g;const h=await(await fetch("https://api.gwent.one/?key=data&version=1.0.0.15&response=json&language=en")).json(),s=Object.values(h.response);g(s),r.addEventListener("input",()=>{const m=r.value.toLowerCase(),d=s.filter(a=>a.name.toLowerCase().includes(m));g(d)})}catch(t){console.error("Ошибка при загрузке списка карт:",t)}}async function c(o){try{const s=(await(await fetch(`https://api.gwent.one/?key=data&version=1.0.0.15&response=json&language=en&id=${o}`)).json()).response[0];f(s)}catch(t){console.error("Ошибка при загрузке подробностей карты:",t)}}function f(o){const t=o.attributes,s=`https://gwent.one/image/gwent/assets/card/art/medium/${o.id.art}.jpg`;i.innerHTML=`
        <h2 class="card-name">${o.name}</h2>
            <div class="card-detail-container">
                <div class="card-detail-image">
                    <img src="${s}" alt="${o.name}" />
                </div>
                <div class="card-detail-info">
                    <div class="card-info-block">   
                        <h3><img src="https://gwent.one/img/icon/search/set/base.png" alt="category icon" width=50px> Category</h3>
                        <p>${o.category}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/nilfgaard.png" alt="ability icon" width=50px> Ability</h3>
                        <p>${o.ability||"—"}</p>
                        <h3><img src="https://gwent.one/img/icon/search/set/thronebreaker.png" alt="flavor icon" width=50px> Flavor</h3>
                        <p><em>${o.flavor||"—"}</em></p>
                    </div>
                    <div class="card-info-block">
                        <h3><img src="https://gwent.one/img/icon/search/type/special.png" alt="type icon" width=50px> Type</h3>
                        <p>${t.type}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/monster.png" alt="faction icon" width=50px> Faction</h3>
                        <p>${t.faction}</p>
                        ${t.factionSecondary?`<h3>Доп. фракция</h3><p>${t.factionSecondary}</p>`:""}
                        <h3><img src="https://gwent.one/img/icon/search/set/master_mirror.png" alt="color icon" width=50px> Color</h3>
                        <p>${t.color}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/stratagem.png" alt="set icon" width=50px> Set</h3>
                        <p>${t.set}</p>
                        <h3><img src="https://gwent.one/img/icon/search/rarity/legendary.png" alt="rarity icon" width=50px> Rarity</h3>
                        <p>${t.rarity}</p>
                        <h3><img src="https://gwent.one/img/icon/search/faction/northern_realms.png" alt="artist icon" width=50px> Artist</h3>
                        <p>${t.artist}</p>
                    </div>
                    <div class="card-info-block">
                        <h3><img src="https://gwent.one/img/icon/search/set/iron_judgment.png" alt="power icon" width=50px> Power</h3>
                        <p>${t.power}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/unit.png" alt="armor icon" width=50px> Armor</h3>
                        <p>${t.armor}</p>
                        <h3><img src="https://gwent.one/img/icon/search/type/artifact.png" alt="provision icon" width=50px> Provision</h3>
                        <p>${t.provision}</p>
                    </div>
                </div>
            </div>
        `,i.style.display="flex",e.scrollTop=0,e.scrollTo({top:i.offsetTop-300,behavior:"smooth"})}n()});
