const c = (x) => console.log(x);

const assets_path = './assets/';
const grid_container = document.getElementById('grid_container');
const game_results = document.getElementById('game_results');
const img_container = document.getElementById('img_container');
const game_img = document.getElementById('game_img');
const skip = document.getElementById('skip');
const enter = document.getElementById('enter');
const restart = document.getElementById('restart');
const quit = document.getElementById('quit');
const finish = document.getElementById('finish');
const user_input = document.getElementById('user_input');
const save_score = document.getElementById('save_score');
const show_score = document.getElementById('show_score');
const clear_scores = document.getElementById('clear_scores');
const show_results = document.getElementById('show_results');
const scores_container = document.getElementById('scores_container');
const images_left = document.getElementById('images_left');
const suggestions = document.getElementById('suggestions');
const options = sessionStorage.getItem('options').split(',');
const suggestions_checked = JSON.parse(sessionStorage.getItem('suggestions_checked'));
const audio_icon = document.getElementById('audio_icon');
const audio = document.getElementById('audio');
let img_count = parseInt(sessionStorage.getItem('img_count'));
let answers_obj = {};
let answers_arr = [];
let user_input_arr = [];
let game_options = {};
let skipped_images = [];
let suggestions_obj;
let suggestions_arr = [];
let shown_imgs = [];
let img_path;
let random_number1;
let random_key;
let random_number2;
let random_value;
let random_index;
let correct_counter = 0;
let incorrect_counter = 0;
let show_score_func_call = 0; //This variable is used to fix an issue with showing scores

//Creates game_options object that contains all the images that will be shown
function createGameOptions() {
    let temp_obj = {};
    for (let i = 0; i < options.length; i++) {
        switch (options[i]) {
            case 'main_characters':
                temp_obj.main_characters = ['beedle.jpg', 'Calamity_Ganon.webp', 'Daruk.webp', 'Great_Deku_Tree.webp', 'Hestu.webp', 'Hylia.webp', 'Impa.webp', 'Kass.webp', 'kilton.jpg', 'King_Dorephan.webp', 'King_rhoam.webp', 'Link.webp', 'Master_Kohga.webp', 'Mipha.webp', 'Monk_Master_Koshia.jpg', 'Old_Man.webp', 'Paya.webp', 'Prince_Sidon.webp', 'Purah.webp', 'Revali.webp', 'riju.jpg', 'Robbie.webp', 'Teba.jpg', 'Urbosa.webp', 'Yunobo.webp', 'Zelda.webp'];
                break;
            case 'all_characters':
                temp_obj.all_characters = ['Agus.png', 'Aji.png', 'Akrah.png', 'Aliza.png', 'Amali.png', 'Ami.png', 'Amira.png', 'Anche.png', 'Ancient_Oven.png', 'Anly.png', 'Ardin.png', 'Ariane.png', 'Armes.png', 'Ashai.png', 'Ashe.png', 'Aster.png', 'Axyl.png', 'Aya.png', 'Azu.png', 'Babi.png', 'Baddek.png', 'Banji.png', 'Bargoh.png', 'Barta.png', 'Baumar.png', 'Bayge.png', 'Bazz.png', 'Bedoli.png', 'Beedle.png', 'Benja.png', 'Benny.png', 'Bertri.png', 'Bladon.png', 'Bludo.png', 'Blynne.png', 'Bohrin.png', 'Boldon.png', 'Bolson.png', 'Botrick.png', 'Bozai.png', 'Branli.png', 'Breen.png', 'Brigo.png', 'Brokka.png', 'Bugut.png', 'Buliara.png', 'Cado.png', 'Calamity_Ganon.png', 'Calip.png', 'Calisa.png', 'Calyban.png', 'Cambo.png', 'Canni.png', 'Canolo.png', 'Cara.png', 'Cecili.png', 'Celessa.png', 'Chabi.png', 'Chessica.png', 'Chio.png', 'Chork.png', 'Chumin.png', 'Cima.png', 'Claree.png', 'Clavia.png', 'Cleff.png', 'Cloyne.png', 'Cotera.png', 'Cottla.png', 'Cree.png', 'Dabi.png', 'Dai.png', 'Dalia.png', 'Damia.png', 'Danda.png', 'Danton.png', 'Dantz.png', 'Daqo_Chisay.png', 'Darton.png', 'Daruk.png', 'Dayto.png', 'Daz.png', 'Deltan.png', 'Dento.png', 'Dillie.png', 'Dina.png', 'Dmitri.png', 'Domidak.png', 'Dorian.png', 'Dorill.png', 'Dorrah.png', 'Douma.png', 'Drak.png', 'Dugby.png', 'Dunma.png', 'Emri.png', 'Ena.png', 'Endai.png', 'Eryck.png', 'Essa.png', 'Estan.png', 'Falmark.png', 'Fegran.png', 'Fin.png', 'Finley.png', 'Flavi.png', 'Flaxel.png', 'Frelly.png', 'Frita.png', 'Fronk.png', 'Fugo.png', 'Furosa.png', 'Fyson.png', 'Gaddison.png', 'Gaile.png', 'Galli.png', 'Garill.png', 'Garini.png', 'Garshon.png', 'Gartan.png', 'Geggle.png', 'Genli.png', 'Gesane.png', 'Giro.png', 'Gleema.png', 'Glendo.png', 'Gonguron.png', 'Gotter.png', 'Grant.png', 'Grapp.png', 'Greta.png', 'Greyson.png', 'Gruve.png', 'Guy.png', 'Hagie.png', 'Haite.png', 'Harlow.png', 'Harth.png', 'Heehl.png', 'Hestu.png', 'Hino.png', 'Horned_Statue.png', 'Hoz.png', 'Huck.png', 'Hudson.png', 'Hunnie.png', 'Hylia.png', 'Impa.png', 'Isha.png', 'Ivee.png', 'Izra.png', 'Jana.png', 'Jengo.png', 'Jerrin.png', 'Jiahto.png', 'Jini.png', 'Jogo.png', 'Jora.png', 'Joute.png', 'Juannelle.png', 'Jules.png', 'Juney.png', 'Kabetta.png', 'Kachoo.png', 'Kaifa.png', 'Kairo.png', 'Kalani.png', 'Kampo.png', 'Kaneli.png', 'Kanny.png', 'Kapson.png', 'Karin.png', 'Karsh.png', 'Karson.png', 'Kass.png', 'Katta.png', 'Kayden.png', 'Kaysa.png', 'Kenyo.png', 'Keye.png', 'Kheel.png', 'Khini.png', 'Kiana.png', 'Kilton.png', 'Kima.png', 'King_Dorephan.png', 'King_Rhoam.png', 'Kinov.png', 'Kish.png', 'Kodah.png', 'Kohm.png', 'Koko.png', 'Konba.png', 'Konora.png', 'Kotta.png', 'Kotts.png', 'Koyin.png', 'Krane.png', 'Kula.png', 'Kyra.png', 'Laflat.png', 'Laine.png', 'Laissa.png', 'Laroba.png', 'Laruta.png', 'Lashley.png', 'Lasli.png', 'Lawdon.png', 'Ledo.png', 'Leekah.png', 'Leena.png', 'Leop.png', 'Lester.png', 'Letty.png', 'Liana.png', 'Link.png', 'Lonni.png', 'Loone.png', 'Lorn.png', 'Lukan.png', 'Lyndae.png', 'Maca.png', 'Magda.png', 'Maike.png', 'Makure.png', 'Malanya.png', 'Malena.png', 'Manny.png', 'Marot.png', 'Marta.png', 'Master_Kohga.png', 'Maypin.png', 'Mayro.png', 'Mazli.png', 'Medda.png', 'Meeshy.png', 'Meghyn.png', 'Mei.png', 'Mellie.png', 'Merina.png', 'Mils.png', 'Mimo.png', 'Mimos.png', 'Mina.png', 'Mipha.png', 'Misa.png', 'Modar.png', 'Moggs.png', 'Molli.png', 'Molo.png', 'Monari.png', 'Monkton.png', 'Moza.png', 'Muava.png', 'Mubs.png', 'Muzu.png', 'Myti.png', 'Nack.png', 'Naddon.png', 'Nali.png', 'Nanna.png', 'Narah.png', 'Nat.png', 'Natie.png', 'Nazbi.png', 'Nebb.png', 'Nekk.png', 'Nell.png', 'Nellie.png', 'Nikki.png', 'Nobiro.png', 'Nobo.png', 'Notts.png', 'Numar.png', 'Oaki.png', 'Offrak.png', 'Old_Man.png', 'Oliff.png', 'Olkin.png', 'Ollie.png', 'Olu.png', 'Onya.png', 'Ozunda.png', 'Padda.png', 'Padok.png', 'Palme.png', 'Parcy.png', 'Pasha.png', 'Paya.png', 'Pearle.png', 'Peeks.png', 'Pelison.png', 'Pepp.png', 'Perda.png', 'Perosa.png', 'Phanna.png', 'Piaffe.png', 'Pikango.png', 'Pirou.png', 'Pitar.png', 'Ploka.png', 'Pokki.png', 'Pondo.png', 'Ponthos.png', 'Prima.png', 'Prissen.png', 'Pritana.png', 'Pruce.png', 'Purah.png', 'Pyle.png', 'Pyra.png', 'Quince.png', 'Ralera.png', 'Ramella.png', 'Reagah.png', 'Reede.png', 'Reeza.png', 'Regan.png', 'Rensa.png', 'Revali.png', 'Rex.png', 'Rhodes.png', 'Rhondson.png', 'Riju.png', 'Rik.png', 'Rima.png', 'Ripp.png', 'Risa.png', 'Rivan.png', 'Robbie.png', 'Robsten.png', 'Rogaro.png', 'Rohan.png', 'Rola.png', 'Romah.png', 'Ronn.png', 'Rotana.png', 'Rozel.png', 'Rudi.png', 'Ruli.png', 'Russ.png', 'Sagessa.png', 'Saki.png', 'Satty.png', 'Saula.png', 'Savelle.png', 'Sayge.png', 'Sebasto.png', 'Sefaro.png', 'Seggin.png', 'Seldon.png', 'Selmie.png', 'Senna.png', 'Sesami.png', 'Shabonne.png', 'Shaillu.png', 'Shamae.png', 'Shay.png', 'Shibo.png', 'Sho.png', 'Sidon.png', 'Slergo.png', 'Smaude.png', 'Sophie.png', 'Sorelia.png', 'Spera.png', 'Spinch.png', 'Spoone.png', 'Sprinn.png', 'Stamm.png', 'Steen.png', 'Strade.png', 'Straia.png', 'Sudrey.png', 'Sumati.png', 'Suzuna.png', 'Symin.png', 'Tali.png', 'Tamana.png', 'Tanko.png', 'Tasho.png', 'Tasseren.png', 'Tauma.png', 'Teake.png', 'Teba.png', 'Teebo.png', 'Teli.png', 'Tenne.png', 'Tera.png', 'Thadd.png', 'The_Great_Deku_Tree.png', 'Toffa.png', 'Tokk.png', 'Toma.png', 'Tona.png', 'Toren.png', 'Torfeau.png', 'Totsuna.png', 'Tottika.png', 'Tray.png', 'Traysi.png', 'Trello.png', 'Trissa.png', 'Trott.png', 'Tula.png', 'Tulin.png', 'Tumbo.png', 'Tye.png', 'Uma.png', 'Urbosa.png', 'Varke.png', 'Verla.png', 'Vilia.png', 'Volcon.png', 'Wabbin.png', 'Walton.png', 'Worten.png', 'Yaido.png', 'Yammo.png', 'Yolero.png', 'Yunobo.png', 'Zelda.png', 'Zooki.png', 'Zorona.png', 'Zumi.png', 'Zuta.png', 'Zyle.png'];
                break;
            case 'enemies':
                temp_obj.enemies = ['Black_Bokoblin.png', 'Black_Hinox.png', 'Black_Lizalfos.png', 'Black_Moblin.png', 'Blizzrobe.png', 'Blue-Maned_Lynel.png', 'Blue_Bokoblin.png', 'Blue_Hinox.png', 'Blue_Lizalfos.png', 'Blue_Moblin.png', 'Bokoblin.png', 'Calamity_Ganon.png', 'Chuchu.png', 'Cursed_Bokoblin.jpg', 'Cursed_Lizalfos.jpg', 'Cursed_Moblin.jpg', 'Dark_Beast_Ganon.png', 'Decayed_Guardian.png', 'Electric_Chuchu.png', 'Electric_Keese.png', 'Electric_Lizalfos.png', 'Electric_Wizzrobe.png', 'Fire-Breath_Lizalfos.png', 'Fireblight_Ganon.png', 'Fire_Chuchu.png', 'Fire_Keese.png', 'Fire_Wizzrobe.png', 'Forest_Octorok.png', 'Frost_Pebblit.png', 'Frost_Talus.png', 'Golden_Bokoblin.png', 'Golden_Lizalfos.png', 'Golden_Lynel.png', 'Golden_Moblin.png', 'Guardian_Scout_I.png', 'Guardian_Scout_II.png', 'Guardian_Scout_III.png', 'Guardian_Scout_IV.png', 'Guardian_Skywatcher.png', 'Guardian_Stalker.png', 'Guardian_Turret.png', 'Hinox.jpg', 'Ice-Breath_Lizalfos.png', 'Ice_Chuchu.png', 'Ice_Keese.png', 'Ice_Wizzrobe.png', 'Igneo_Pebblit.png', 'Igneo_Talus.png', 'Igneo_Talus_Titan.png', 'Keese.jpg', 'Lizalfos.png', 'Lynel.png', 'Malice.png', 'Master_Kohga.png', 'Meteo_Wizzrobe.png', 'Moblin.png', 'Molduga.png', 'Molduking.png', 'Monk_Maz_Koshia.png', 'Rock_Octorok.png', 'Sentry.png', 'Silver_Bokoblin.png', 'Silver_Lizalfos.png', 'Silver_Lynel.png', 'Silver_Moblin.png', 'Sky_Octorok.png', 'Snow_Octorok.png', 'Stalizalfos.png', 'Stalkoblin.png', 'Stalmoblin.png', 'Stalnox.png', 'Stone_Pebblit.png', 'Stone_Talus.png', 'Stone_Talus_Luminous.png', 'Stone_Talus_Rare.png', 'Thunderblight_Ganon.png', 'Thunder_Wizzrobe.png', 'Treasure_Octorok.png', 'Waterblight_Ganon.png', 'Water_Octorok.png', 'White-Maned_Lynel.png', 'Windblight_Ganon.png', 'Yiga_Blademaster.png', 'Yiga_Footsoldier.png'];
                break;
            case 'bows':
                temp_obj.bows = ['Ancient_Arrow.png', 'Ancient_Bow.png', 'Arrow.png', 'Boko_Bow.png', 'Bomb_Arrow.png', 'Bow_of_Light.png', 'Dragon_Bone_Boko_Bow.png', 'Duplex_Bow.png', 'Falcon_Bow.png', 'Fire_Arrow.png', "Forest_Dweller's_Bow.png", 'Golden_Bow.png', 'Great_Eagle_Bow.png', 'Ice_Arrow.png', "Knight's_Bow.png", 'Lizal_Bow.png', 'Lynel_Bow.png', 'Mighty_Lynel_Bow.png', 'Phrenic_Bow.png', 'Royal_Bow.png', "Royal_Guard's_Bow.png", 'Savage_Lynel_Bow.png', 'Shock_Arrow.png', 'Silver_Bow.png', "Soldier's_Bow.png", 'Spiked_Boko_Bow.png', 'Steel_Lizal_Bow.png', 'Strengthened_Lizal_Bow.png', 'Swallow_Bow.png', "Traveler's_Bow.png", 'Wooden_Bow.png'];
                break;
            case 'shields':
                temp_obj.shields = ['Ancient_Shield.png', 'Boko_Shield.png', 'Daybreaker.png', 'Dragonbone_Boko_Shield.png', 'Emblazoned_Shield.png', "Fisherman's_Shield.png", "Forest_Dweller's_Shield.png", 'Gerudo_Shield.png', 'Guardian_Shield.png', 'Guardian_Shield_++.png', 'Guardian_Shield_+.png', "Hunter's_Shield.png", 'Hylian_Shield.png', 'Kite_Shield.png', "Knight's_Shield.png", 'Lizal_Shield.png', 'Lynel_Shield.png', 'Mighty_Lynel_Shield.png', 'Pot_Lid.png', 'Radiant_Shield.png', 'Reinforced_Lizal_Shield.png', "Royal_Guard's_Shield.png", 'Royal_Shield.png', 'Rusty_Shield.png', 'Savage_Lynel_Shield.png', "Shield_of_the_Mind's_Eye.png", 'Silver_Shield.png', "Soldier's_Shield.png", 'Spiked_Boko_Shield.png', 'Steel_Lizal_Shield.png', "Traveler's_Shield.png", 'Wooden_Shield.png'];
                break;
            case 'shrines':
                temp_obj.shrines = ["Akh_Va'quot_Shrine.png", 'Bareeda_Naag_Shrine.png', 'Bosh_Kala_Shrine.png', 'Chaas_Qeta_Shrine.png', 'Daag_Chokah_Shrine.png', 'Dagah_Keek_Shrine.png', 'Dah_Hesho_Shrine.png', 'Dah_Kaso_Shrine.jpg', 'Daka_Tuss_Shrine.png', 'Dako_Tah_Shrine.png', 'Daqa_Koh_Shrine.jpg', 'Daqo_Chisay_Shrine.png', 'Dila_Maag_Shrine.png', "Dow_Na'eh_Shrine.png", 'Dunba_Taag_Shrine.png', 'Etsu_Korima_Shrine.png', "Gee_Ha'rah_Shrine.png", 'Goma_Asaagh_Shrine.png', 'Gorae_Torr_Shrine.png', 'Hawa_Koth_Shrine.png', 'Ha_Dahamar_Shrine.png', 'Hia_Miu_Shrine.png', 'Hila_Rao_Shrine.png', 'Ishto_Soh_Shrine.png', 'Ja_Baij_Shrine.png', 'Jee_Noh_Shrine.png', "Jitan_Sa'mi_Shrine.png", 'Joloo_Nah_Shrine.png', "Ka'o_Makagh_Shrine.png", "Kaam_Ya'tak_Shrine.png", 'Kah_Mael_Shrine.png', 'Kah_Okeo_Shrine.png', 'Kah_Yah_Shrine.png', 'Kamia_Omuna_Shrine.png', 'Kam_Urog_Shrine.png', 'Katah_Chuki_Shrine.png', 'Katosa_Aug_Shrine.png', 'Kaya_Wan_Shrine.png', 'Kayra_Mah_Shrine.png', 'Kay_Noh_Shrine.png', "Ke'nai_Shakah_Shrine.png", 'Keeha_Yoog_Shrine.png', 'Kee_Dafunia_Shrine.png', 'Keh_Namut_Shrine.png', 'Keive_Tala_Shrine.png', 'Kema_Kosassa_Shrine.png', 'Kema_Zoos_Shrine.png', 'Keo_Ruug_Shrine.jpg', 'Ketoh_Wawai_Shrine.png', 'Kiah_Toza_Shrine.png', 'Kihiro_Moh_Shrine.png', 'Korgu_Chideh_Shrine.png', "Korsh_O'hu_Shrine.png", 'Kuhn_Sidajj_Shrine.png', 'Kuh_Takkar_Shrine.png', 'Lakna_Rokee_Shrine.png', 'Lanno_Kooh_Shrine.png', 'Maag_Halan_Shrine.png', "Maag_No'rah_Shrine.png", 'Mah_Eliya_Shrine.png', 'Maka_Rah_Shrine.png', 'Mezza_Lo_Shrine.png', 'Mijah_Rokee_Shrine.png', 'Mirro_Shaz_Shrine.png', 'Misae_Suma_Shrine.png', "Mo'a_Keet_Shrine.png", 'Mogg_Latan_Shrine.png', 'Monya_Toma_Shrine.png', 'Mozo_Shenno_Shrine.png', 'Muwo_Jeem_Shrine.png', 'Myahm_Agana_Shrine.png', 'Namika_Ozz_Shrine.png', "Ne'ez_Yohma_Shrine.png", 'Noe_Rajee_Shrine.png', 'Noya_Neha_Shrine.png', 'Oman_Au_Shrine.png', 'Owa_Daim_Shrine.png', 'Pumaag_Nitae_Shrine.png', 'Qaza_Tokki_Shrine.png', 'Qua_Raym_Shrine.png', 'Qukah_Nata_Shrine.png', 'Raqa_Zunzo_Shrine.png', 'Ree_Dahee_Shrine.png', 'Rinu_Honika_Shrine.png', 'Rin_Oyaa_Shrine.png', 'Ritaag_Zumo_Shrine.png', 'Rohta_Chigah_Shrine.png', 'Rok_Uwog_Shrine.png', 'Rona_Kachta_Shrine.png', 'Rota_Ooh_Shrine.png', 'Rucco_Maag_Shrine.png', 'Ruvo_Korbah_Shrine.png', "Saas_Ko'sah_Shrine.jpg", 'Sah_Dahaj_Shrine.png', 'Sasa_Kai_Shrine.png', 'Sato_Koda_Shrine.png', 'Shada_Naw_Shrine.png', 'Shae_Katha_Shrine.png', 'Shae_Loya_Shrine.png', "Shae_Mo'sah_Shrine.png", 'Shai_Utoh_Shrine.png', 'Shai_Yota_Shrine.png', 'Sharo_Lun_Shrine.png', 'Sha_Gehma_Shrine.png', 'Sha_Warvo_Shrine.png', 'Sheem_Dagoze_Shrine.png', 'Shee_Vaneer_Shrine.png', 'Shee_Venath_Shrine.png', 'Sheh_Rata_Shrine.png', 'Shira_Gomar_Shrine.png', 'Shoda_Sah_Shrine.png', 'Shoqa_Tatone_Shrine.png', 'Shora_Hah_Shrine.png', 'Sho_Dantu_Shrine.png', 'Soh_Kofi_Shrine.png', 'Suma_Sahma_Shrine.png', "Ta'loh_Naeg_Shrine.png", "Tahno_O'ah_Shrine.png", 'Tah_Muhl_Shrine.png', 'Takama_Shiri_Shrine.png', 'Tawa_Jinn_Shrine.png', "Tena_Ko'sah_Shrine.png", 'Tho_Kayu_Shrine.png', 'Toh_Yahsa_Shrine.png', 'Toto_Sah_Shrine.png', 'To_Quomo_Shrine.png', 'Tutsuwa_Nima_Shrine.png', "Tu_Ka'loh_Shrine.png", 'Voo_Lota_Shrine.png', 'Wahgo_Katta_Shrine.png', 'Yah_Rin_Shrine.png', 'Ya_Naga_Shrine.png', 'Yowaka_Ita_Shrine.png', 'Zalta_Wa_Shrine.png', 'Ze_Kasho_Shrine.png', 'Zuna_Kai_Shrine.png'];
                break;
            case 'weapons':
                temp_obj.weapons = ['Ancient_Battle_Axe.png', 'Ancient_Battle_Axe_++.png', 'Ancient_Battle_Axe_+.png', 'Ancient_Bladesaw.png', 'Ancient_Short_Sword.png', 'Ancient_Spear.png', 'Blizzard_Rod.png', 'Boat_Oar.png', 'Bokoblin_Arm.png', 'Boko_Bat.png', 'Boko_Club.png', 'Boko_Spear.png', 'Boomerang.png', 'Boulder_Breaker.png', 'Ceremonial_Trident.png', 'Cobble_Crusher.png', 'Demon_Carver.png', 'Double_Axe.png', 'Dragonbone_Boko_Bat.png', 'Dragonbone_Boko_Club.png', 'Dragonbone_Boko_Spear.png', 'Dragonbone_Moblin_Club.png', 'Dragonbone_Moblin_Spear.png', 'Drillshaft.png', 'Edge_of_Duality.png', 'Eightfold_Blade.png', 'Eightfold_Longblade.png', 'Enhanced_Lizal_Spear.png', "Farmer's_Pitchfork.png", 'Farming_Hoe.png', 'Feathered_Edge.png', 'Feathered_Spear.png', 'Fire_Rod.png', 'Fishing_Harpoon.png', 'Flameblade.png', 'Flamespear.png', "Forest_Dweller's_Spear.png", "Forest_Dweller's_Sword.png", 'Forked_Lizal_Spear.png', 'Frostblade.png', 'Frostspear.png', 'Gerudo_Scimitar.png', 'Gerudo_Spear.png', 'Giant_Boomerang.png', 'Golden_Claymore.png', 'Great_Flameblade.png', 'Great_Frostblade.png', 'Great_Thunderblade.png', 'Guardian_Spear.png', 'Guardian_Spear_++.png', 'Guardian_Spear_+.png', 'Guardian_Sword.png', 'Guardian_Sword_++.png', 'Guardian_Sword_+.png', 'Ice_Rod.png', 'Iron_Sledgehammer.png', "Knight's_Broadsword.png", "Knight's_Claymore.png", "Knight's_Halberd.png", 'Korok_Leaf.png', 'Lightning_Rod.png', 'Lightscale_Trident.png', 'Lizalfos_Arm.png', 'Lizal_Boomerang.png', 'Lizal_Forked_Boomerang.png', 'Lizal_Spear.png', 'Lizal_Tri-Boomerang.png', 'Lynel_Crusher.png', 'Lynel_Spear.png', 'Lynel_Sword.png', 'Master_Sword.png', 'Meteor_Rod.png', 'Mighty_Lynel_Crusher.png', 'Mighty_Lynel_Spear.png', 'Mighty_Lynel_Sword.png', 'Moblin_Arm.png', 'Moblin_Club.png', 'Moblin_Spear.png', 'Moonlight_Scimitar.png', 'One-Hit_Obliterator.jpg', 'Royal_Broadsword.png', 'Royal_Claymore.png', "Royal_Guard's_Claymore.png", "Royal_Guard's_Spear.png", "Royal_Guard's_Sword.png", 'Royal_Halberd.png', 'Rusty_Broadsword.png', 'Rusty_Claymore.png', 'Rusty_Halberd.png', 'Savage_Lynel_Crusher.png', 'Savage_Lynel_Spear.png', 'Savage_Lynel_Sword.png', 'Scimitar_of_the_Seven.png', 'Serpentine_Spear.png', 'Silverscale_Spear.png', 'Silver_Longsword.png', "Soldier's_Broadsword.png", "Soldier's_Claymore.png", "Soldier's_Spear.png", 'Soup_Ladle.png', 'Spiked_Boko_Bat.png', 'Spiked_Boko_Club.png', 'Spiked_Boko_Spear.png', 'Spiked_Moblin_Club.png', 'Spiked_Moblin_Spear.png', 'Spring-Loaded_Hammer.png', 'Stone_Smasher.png', 'Throwing_Spear.png', 'Thunderblade.png', 'Thunderspear.png', 'Thunderstorm_Rod.png', 'Torch.png', "Traveler's_Claymore.png", "Traveler's_Spear.png", "Traveler's_Sword.png", 'Tree_Branch.png', 'Vicious_Sickle.png', 'Windcleaver.png', "Woodcutter's_Axe.png", 'Wooden_Mop.png', 'Zora_Spear.png', 'Zora_Sword.png'];
                break;
            case 'drip':
                temp_obj.drip = ['Amber_earrings.png', 'Ancient_bridle.png', 'Ancient_cuirass.png', 'Ancient_greaves.png', 'Ancient_helm.png', 'Ancient_saddle.png', 'Barbarian_armor.png', 'Barbarian_helm.png', 'Barbarian_leg_wraps.png', 'Bokoblin_mask.png', 'Cap_of_the_hero.png', 'Cap_of_the_sky.png', 'Cap_of_the_wild.png', 'Cap_of_the_wind.png', 'Cap_of_time.png', 'Cap_of_twilight.png', 'Champion_tunic.png', 'Climber_bandanna.png', 'Climbing_boots.png', 'Climbing_gear.png', 'Dark_hood.png', 'Dark_trousers.png', 'Dark_tunic.png', 'Desert_voe_headband.png', 'Desert_voe_spaulder.png', 'Desert_voe_trousers.png', 'Diamond_circlet.png', 'Extravagant_bridle.png', 'Extravagant_saddle.png', 'Fierce_deity_armor.png', 'Fierce_deity_boots.png', 'Fierce_deity_mask.png', 'Flamebreaker_armor.png', 'Flamebreaker_boots.png', 'Flamebreaker_helm.png', 'Gerudo_sirwal.png', 'Gerudo_top.png', 'Gerudo_veil.png', 'Hylian_hood.png', 'Hylian_trousers.png', 'Hylian_tunic.png', 'Island_lobster_shirt.png', 'Knights_bridle.png', 'Knights_saddle.png', 'Korok_mask.png', 'Lizalfos_mask.png', 'Lynel_mask.png', 'Majoras_mask.png', 'Medoh_helm.png', 'Midna_helmet.png', 'Moblin_mask.png', 'Monster_bridle.png', 'Monster_saddle.png', 'Naboris_helm.png', 'Old_shirt.png', 'Opal_earrings.png', 'Phantom_armor.png', 'Phantom_ganon_armor.png', 'Phantom_ganon_greaves.png', 'Phantom_ganon_skull.png', 'Phantom_greaves.png', 'Phantom_helmet.png', 'Radiant_mask.png', 'Radiant_shirt.png', 'Radiant_tights.png', 'Ravio_hood.png', 'Royal_bridle.png', 'Royal_guard_boots.png', 'Royal_guard_cap.png', 'Royal_guard_uniform.png', 'Royal_saddle.png', 'Rubber_armor.png', 'Rubber_helm.png', 'Rubber_tights.png', 'Ruby_circlet.png', 'Rudania_helm.png', 'Ruta_helm.png', 'Salvager_helm.png', 'Salvager_trousers.png', 'Salvager_vest.png', 'Sand_boots.png', 'Sapphire_circlet.png', 'Sheik_mask.png', 'Snowquill_headdress.png', 'Snowquill_trousers.png', 'Snowquill_tunic.png', 'Snow_boots.png', 'Soldiers_armor.png', 'Soldiers_greaves.png', 'Soldiers_helm.png', 'Stealth_chest_guard.png', 'Stealth_mask.png', 'Stealth_tights.png', 'Switch_shirt.png', 'Thunder_helm.png', 'Tingle_hood.png', 'Tingle_shirt.png', 'Tingle_tights.png', 'Topaz_earrings.png', 'Travelers_bridle.png', 'Travelers_saddle.png', 'Trousers_of_the_hero.png', 'Trousers_of_the_sky.png', 'Trousers_of_the_wild.png', 'Trousers_of_the_wind.png', 'Trousers_of_time.png', 'Trousers_of_twilight.png', 'Tunic_of_the_hero.png', 'Tunic_of_the_sky.png', 'Tunic_of_the_wild.png', 'Tunic_of_the_wind.png', 'Tunic_of_time.png', 'Tunic_of_twilight.png', 'Warm_doublet.png', 'Well_worn_trousers.png', 'Zant_helmet.png', 'Zora_armor.png', 'Zora_greaves.png', 'Zora_helm.png'];
                break;
            case 'creatures':
                temp_obj.creatures = ['Armored_Carp.png', 'Armored_Porgy.png', 'Bladed_Rhino_Beetle.png', 'Blue-Winged_Heron.png', 'Blue_Sparrow.png', 'Blupee.png', 'Bright-Chested_Duck.png', 'Bright-Eyed_Crab.png', 'Bushy-Tailed_Squirrel.png', 'Chillfin_Trout.png', 'Cold-Footed_Wolf.png', 'Cold_Darner.png', 'Common_Sparrow.png', 'Cucco.png', 'Dinraal.png', 'Donkey.png', 'Eldin_Ostrich.png', 'Electric_Darner.png', 'Energetic_Rhino_Beetle.png', 'Fairy.png', 'Farosh.png', 'Fireproof_Lizard.png', 'Giant_Horse.png', 'Golden_Sparrow.png', 'Grassland_Fox.png', 'Great-Horned_Rhinoceros.png', 'Grizzlemaw_Bear.png', 'Hateno_Cow.png', 'Hearty_Bass.png', 'Hearty_Blueshell_Snail.png', 'Hearty_Lizard.png', 'Hearty_Salmon.png', 'Highland_Sheep.png', 'Hightail_Lizard.png', 'Honeyvore_Bear.png', 'Horse.png', 'Hot-Footed_Frog.png', 'Hotfeather_Pigeon.png', 'Hylian_Retriever.png', 'Hyrule_Bass.png', 'Ironshell_Crab.png', 'Islander_Hawk.png', 'Lord_of_the_Mountain.png', 'Maraudo_Wolf.png', 'Mighty_Carp.png', 'Mighty_Porgy.png', 'Mountain_Buck.png', 'Mountain_Crow.png', 'Mountain_Doe.png', 'Mountain_Goat.png', 'Naydra.png', 'Patricia.png', 'Pink_Heron.png', 'Rainbow_Pigeon.png', 'Rainbow_Sparrow.png', 'Razorclaw_Crab.png', 'Red-Tusked_Boar.png', 'Red_Sparrow.png', 'Restless_Cricket.png', 'Rugged_Rhino_Beetle.png', 'Sand_Seal.png', 'Sand_Sparrow.png', 'Sanke_Carp.png', 'Seagull.png', 'Sizzlefin_Trout.png', 'Smotherwing_Butterfly.png', 'Sneaky_River_Snail.png', 'Snowcoat_Fox.png', 'Stalhorse.png', 'Staminoka_Bass.png', 'Stealthfin_Trout.png', 'Summerwing_Butterfly.png', 'Sunset_Firefly.png', 'Tabantha_Moose.png', 'Thunderwing_Butterfly.png', 'Tireless_Frog.png', 'Voltfin_Trout.png', 'Warm_Darner.png', 'Wasteland_Coyote.png', 'Water_Buffalo.png', 'White_Goat.png', 'White_Horse.png', 'White_Pigeon.png', 'Winterwing_Butterfly.png', 'Woodland_Boar.png', 'Wood_Pigeon.png'];
                break;
            case 'materials':
                temp_obj.materials = ['Acorn.png', 'Amber.png', 'Ancient_Core.png', 'Ancient_Gear.png', 'Ancient_Screw.png', 'Ancient_Shaft.png', 'Ancient_Spring.png', 'Apple.png', 'Armoranth.png', 'Big_Hearty_Radish.png', 'Big_Hearty_Truffle.png', 'Bird_Egg.png', 'Blue_Nightshade.png', 'Bokoblin_Fang.png', 'Bokoblin_Guts.png', 'Bokoblin_Horn.png', 'Cane_Sugar.png', 'Chickaloo_Tree_Nut.png', 'Chillshroom.png', 'Chuchu_Jelly.png', 'Cool_Safflina.png', 'Courser_Bee_Honey.png', 'Diamond.png', "Dinraal's_Claw.png", "Dinraal's_Scale.png", 'Electric_Keese_Wing.png', 'Electric_Safflina.png', 'Endura_Carrot.png', 'Endura_Shroom.png', "Farosh's_Claw.png", "Farosh's_Scale.png", 'Fire_Keese_Wing.png', 'Fleet_Lotus_Seeds.png', 'Flint.png', 'Fortified_Pumpkin.png', 'Fresh_Milk.png', 'Giant_Ancient_Core.png', 'Goat_Butter.png', 'Goron_Spice.png', 'Hearty_Durian.png', 'Hearty_Radish.png', 'Hearty_Truffle.png', 'Hinox_Guts.png', 'Hinox_Toenail.png', 'Hinox_Tooth.png', 'Hydromelon.png', 'Hylian_Rice.png', 'Hylian_Shroom.png', 'Hyrule_Herb.png', 'Ice_Keese_Wing.png', 'Icy_Lizalfos_Tail.png', 'Ironshroom.png', 'Keese_Eyeball.png', 'Keese_Wing.png', 'Lizalfos_horn.png', 'Lizalfos_Tail.png', 'Lizalfos_Talon.png', 'Luminous_Stone.png', 'Lynel_Guts.png', 'Lynel_Hoof.png', 'Lynel_Horn.png', 'Mighty_Bananas.png', 'Mighty_Thistle.png', 'Moblin_Fang.png', 'Moblin_Guts.png', 'Moblin_Horn.png', 'Molduga_Fin.png', 'Molduga_Guts.png', 'Monster_Extract.png', "Naydra's_Claw.png", "Naydra's_Scale.png", 'Octorok_Eyeball.png', 'Octorok_Tentacle.png', 'Octo_Balloon.png', 'Opal.png', 'Palm_Fruit.png', 'Raw_Bird_Drumstick.png', 'Raw_Bird_Thigh.png', 'Raw_Gourmet_Meat.png', 'Raw_Meat.png', 'Raw_Prime_Meat.png', 'Raw_Whole_Bird.png', 'Razorshroom.png', 'Red_Chuchu_Jelly.png', 'Red_Lizalfos_Tail.png', 'Rock_Salt.png', 'Ruby.png', 'Rushroom.png', 'Sapphire.png', "Shard_of_Dinraal's_Fang.png", "Shard_of_Dinraal's_Horn.png", "Shard_of_Farosh's_Fang.png", "Shard_of_Farosh's_Horn.png", "Shard_of_Naydra's_Fang.png", "Shard_of_Naydra's_Horn.png", 'Silent_Princess.png', 'Silent_Shroom.png', 'Spicy_Pepper.png', 'Stamella_Shroom.png', 'Star_fragment.png', 'Sunshroom.png', 'Swift_Carrot.png', 'Swift_Violet.png', 'Tabantha_Wheat.png', 'Voltfruit.png', 'Warm_Safflina.png', 'White_Chuchu_Jelly.png', 'Wildberry.png', 'Wood.png', 'Yellow_Chuchu_Jelly.png', 'Yellow_Lizalfos_Tail.png', 'Zapshroom.png'];
                break;
            case 'food':
                temp_obj.food = ['Apple_pie.png', 'Baked_Apple.png', 'Baked_Fortified_Pumpkin.png', 'Baked_Palm_Fruit.png', 'Blackened_Crab.png', 'Blueshell_Escargot.png', 'Campfire_Egg.png', 'Carrot_cake.png', 'Carrot_stew.png', 'Charred_Pepper.png', 'Chilly_elixir.png', 'Copious_fish_skewers.png', 'Copious_fried_wild_greens.png', 'Copious_meat_skewers.png', 'Copious_mushroom_skewers.png', 'Copious_simmered_fruit.png', 'Crab_omelet_with_rice.png', 'Crab_risotto.png', 'Crab_stir_fry.png', 'Creamy_heart_soup.png', 'Creamy_meat_soup.png', 'Creamy_seafood_soup.png', 'Cream_of_mushroom_soup.png', 'Cream_of_vegetable_soup.png', 'Curry_pilaf.png', 'Curry_rice.png', 'Dubious_food.png', 'Egg_pudding.png', 'Egg_tart.png', 'Electro_elixir.png', 'Enduring_elixir.png', 'Energizing_elixir.png', 'Fairy_tonic.png', 'Fireproof_elixir.png', 'Fish_and_mushroom_skewer.png', 'Fish_pie.png', 'Fish_skewer.png', 'Fragrant_mushroom_sauté.png', 'Fried_bananas.png', 'Fried_egg_and_rice.png', 'Fried_wild_greens.png', 'Frozen_Bass.png', 'Frozen_Bird_Drumstick.png', 'Frozen_Bird_Thigh.png', 'Frozen_Carp.png', 'Frozen_Crab.png', 'Frozen_Hearty_Bass.png', 'Frozen_Hearty_Salmon.png', 'Frozen_Porgy.png', 'Frozen_River_Snail.png', 'Frozen_Trout.png', 'Frozen_Whole_Bird.png', 'Fruitcake.png', 'Fruit_and_mushroom_mix.png', 'Fruit_pie.png', 'Glazed_meat.png', 'Glazed_mushrooms.png', 'Glazed_seafood.png', 'Glazed_veggies.png', 'Gourmet_meat_and_rice_bowl.png', 'Gourmet_meat_and_seafood_fry.png', 'Gourmet_meat_curry.png', 'Gourmet_meat_stew.png', 'Gourmet_poultry_curry.png', 'Gourmet_poultry_pilaf.png', 'Gourmet_spiced_meat_skewer.png', 'Hard_Boiled_Egg.png', 'Hasty_elixir.png', 'Hearty_clam_chowder.png', 'Hearty_elixir.png', 'Hearty_salmon_meunière.png', 'Herb_sauté.png', 'Honeyed_apple.png', 'Honeyed_fruits.png', 'Honey_candy.png', 'Honey_crepe.png', 'Hot_buttered_apple.png', 'Icy_Gourmet_Meat.png', 'Icy_Hearty_Blueshell_Snail.png', 'Icy_Meat.png', 'Icy_Prime_Meat.png', 'Meaty_rice_balls.png', 'Meat_and_mushroom_skewer.png', 'Meat_and_rice_bowl.png', 'Meat_and_seafood_fry.png', 'Meat_curry.png', 'Meat_pie.png', 'Meat_skewer.png', 'Meat_stew.png', 'Meat_stuffed_pumpkin.png', 'Mighty_elixir.png', 'Milk_Breath_of_the_Wild.png', 'Monster_cake.png', 'Monster_curry.png', 'Monster_rice_balls.png', 'Monster_soup.png', 'Monster_stew.png', 'Mushroom_omelet.png', 'Mushroom_rice_balls.png', 'Mushroom_risotto.png', 'Mushroom_skewer.png', 'Nutcake.png', 'Omelet.png', 'Pepper_seafood.png', 'Plain_crepe.png', 'Porgy_meunière.png', 'Poultry_curry.png', 'Poultry_pilaf.png', 'Prime_meat_and_rice_bowl.png', 'Prime_meat_and_seafood_fry.png', 'Prime_meat_curry.png', 'Prime_meat_stew.png', 'Prime_poultry_curry.png', 'Prime_poultry_pilaf.png', 'Prime_spiced_meat_skewer.png', 'Pumpkin_pie.png', 'Pumpkin_stew.png', 'Roasted_Acorn.png', 'Roasted_Armoranth.png', 'Roasted_Bass.png', 'Roasted_Big_Radish.png', 'Roasted_Bird_Drumstick.png', 'Roasted_Bird_Thigh.png', 'Roasted_Carp.png', 'Roasted_Endura_Carrot.png', 'Roasted_Hearty_Bass.png', 'Roasted_Hearty_Durian.png', 'Roasted_Hearty_Salmon.png', 'Roasted_Hydromelon.png', 'Roasted_Lotus_Seeds.png', 'Roasted_Mighty_Bananas.png', 'Roasted_Mighty_Thistle.png', 'Roasted_Porgy.png', 'Roasted_Radish.png', 'Roasted_Swift_Carrot.png', 'Roasted_Tree_Nut.png', 'Roasted_Trout.png', 'Roasted_Voltfruit.png', 'Roasted_Whole_Bird.png', 'Roasted_Wildberry.png', 'Rock_hard_food.png', 'Salmon_risotto.png', 'Salt_grilled_crab.png', 'Salt_grilled_fish.png', 'Salt_grilled_gourmet_meat.png', 'Salt_grilled_greens.png', 'Salt_grilled_meat.png', 'Salt_grilled_mushrooms.png', 'Salt_grilled_prime_meat.png', 'Sautéed_nuts.png', 'Sautéed_peppers.png', 'Seafood_curry.png', 'Seafood_fried_rice.png', 'Seafood_meunière.png', 'Seafood_paella.png', 'Seafood_rice_balls.png', 'Seafood_skewer.png', 'Seared_Gourmet_Steak.png', 'Seared_Prime_Steak.png', 'Seared_Steak.png', 'Simmered_fruit.png', 'Sneaky_elixir.png', 'Sneaky_River_Escargot.png', 'Spiced_meat_skewer.png', 'Spicy_elixir.png', 'Spicy_pepper_steak.png', 'Steamed_fish.png', 'Steamed_fruit.png', 'Steamed_meat.png', 'Steamed_mushrooms.png', 'Toasted_Big_Hearty_Truffle.png', 'Toasted_Hearty_Truffle.png', 'Toasty_Chillshroom.png', 'Toasty_Endura_Shroom.png', 'Toasty_Hylian_Shroom.png', 'Toasty_Ironshroom.png', 'Toasty_Razorshroom.png', 'Toasty_Rushroom.png', 'Toasty_Silent_Shroom.png', 'Toasty_Stamella_Shroom.png', 'Toasty_Sunshroom.png', 'Toasty_Zapshroom.png', 'Tough_elixir.png', 'Vegetable_curry.png', 'Vegetable_omelet.png', 'Vegetable_risotto.png', 'Veggie_cream_soup.png', 'Veggie_rice_balls.png', 'Wheat_bread.png', 'Wildberry_crepe.png'];
                break;
            case 'locations':
                temp_obj.locations = ['Abandoned_North_Mine.png', 'Afromsia_Coast.png', 'Akkala_Ancient_Tech_Lab.png', 'Akkala_Bridge_Ruins.png', 'Akkala_Citadel_Ruins.png', 'Akkala_Falls.png', 'Akkala_Parade_Ground_Ruins.png', 'Akkala_Span.png', 'Akkala_Tower.png', 'Akkala_Wilds.png', 'Aldor_Foothills.png', 'All_or_Nothing.png', 'Ancient_Columns.png', 'Ancient_Tree_Stump.png', 'Angel_Peak.png', 'Ankel_Island.png', 'Applean_Forest.png', 'Aquame_Bridge.png', 'Aquame_Lake.png', "Arbiter's_Grounds.png", 'Aris_Beach.png', 'Arrow_Specialty_Shop.png', 'Ash_Swamp.png', 'Astral_Observatory.png', 'Atun_Valley.png', 'Bank_of_Wishes.png', 'Bannan_Island.png', 'Barracks.png', 'Barula_Plain.png', 'Batrea_Lake.png', 'Bell_Tower.png', 'Big_Twin_Bridge.png', 'Birida_Lookout.png', 'Biron_Snowshelf.png', 'Blatchery_Plain.png', 'Bloodleaf_Lake.png', 'Bon_Pond.png', 'Boneyard_Bridge.png', "Bonooru's_Stand.png", "Boss's_House.png", 'Bottomless_Swamp.png', 'Brazen_Beak.png', 'Breach_of_Demise.png', 'Breman_Peak.png', 'Bridge_of_Eldin.png', 'Bridge_of_Hylia.png', 'Broca_Island.png', 'Bronas_Forest.png', 'Brynna_Plain.png', 'Bubinga_Forest.png', 'Calora_Lake.png', 'Camphor_Pond.png', 'Cape_Cales.png', 'Cape_Cresia.png', 'Carok_Bridge.png', 'Castle_Town_Prison.png', 'Castle_Town_Watchtower.png', 'Central_Square.png', 'Central_Tower.png', 'Cephla_Lake.png', "Champion's_Gate.png", "Champion's_Gate_North.png", "Champions'_Hall.png", 'Clarnet_Coast.png', 'Cliffs_of_Quince.png', 'Cliffs_of_Ruvara.png', 'Coldsnap_Hollow.png', 'Coliseum_Ruins.png', 'Common_Cooking_Area.png', 'Coral_Reef.png', 'Cora_Lake.png', 'Corta_Lake.png', 'Corvash_Peak.png', 'Courage_Steppe.png', 'Crenel_Hills.png', 'Crenel_Peak.png', 'Cuho_Mountain.png', 'Dalite_Forest.png', 'Damel_Forest.png', 'Darb_Pond.png', 'Darunia_Lake.png', 'Darybon_Plains.png', 'Daval_Peak.png', 'Davdi_Island.png', 'Death_Caldera.png', 'Death_Mountain_Summit.png', 'Deepback_Bay.png', 'Deplian_Badlands.png', 'Deya_Lake.png', 'Deya_Village_Ruins.png', 'Digdogg_Suspension_Bridge.png', 'Dining_Hall.png', 'Divine_Beast_Vah_Medoh.png', 'Divine_Beast_Vah_Naboris.png', 'Divine_Beast_Vah_Rudania.png', 'Divine_Beast_Vah_Ruta.png', 'Docks.png', 'Dracozu_Lake.png', 'Dracozu_River.png', "Dragon's_Exile.png", 'Dragon_Bone_Mire.png', 'Drenan_Highlands.png', "Dronoc's_Pass.png", 'Dueling_Peaks.png', 'Dueling_Peaks_South.png', 'Dueling_Peaks_Stable.png', 'Dueling_Peaks_Tower.png', 'Dunsel_Plateau.png', 'Eagus_Bridge.png', 'Eastern_Abbey.png', 'Eastern_Daval_Peak.png', 'East_Akkala_Beach.png', 'East_Akkala_Plains.png', 'East_Akkala_Stable.png', 'East_Barrens.png', 'East_Castle_Town.png', 'East_Deplian_Badlands.png', 'East_Gerudo_Mesa.png', 'East_Gerudo_Ruins.png', 'East_Gut_Check_Rock.png', 'East_Hyrule_Castle.png', 'East_Mount_Granajh.png', 'East_Passage.png', 'East_Post_Ruins.png', 'East_Ranch_Ruins.png', 'East_Reservoir_Lake.png', 'East_Sokkala_Bridge.png', 'East_Wind.png', 'Ebara_Forest.png', 'Ebon_Mountain.png', "Eldin's_Flank.png", 'Eldin_Great_Skeleton.png', 'Eldin_Tower.png', 'Elma_Knolls.png', 'Enchanted.png', 'Equestrian_Riding_Course.png', "Estan's_General_Store.png", 'Eventide_Island.png', 'Exchange_Ruins.png', 'Fang_and_Bone.png', 'Faron_Highroad.png', 'Faron_Tower.png', 'Faron_Woods.png', 'Farosh_Hills.png', 'Fashion_Passion.png', 'Finra_Woods.png', 'Firly_Plateau.png', 'Firly_Pond.png', 'First_Gatehouse.png', 'Fir_River.png', 'Fishing_Resort.png', 'Flight_Range.png', 'Floret_Sandbar.png', 'Floria_Bridge.png', 'Floria_Falls.png', 'Floria_River.png', 'Foothill_Stable.png', 'Footrace_Check-In.png', 'Forest_of_Spirits.png', 'Forest_of_Time.png', 'Forgotten_Temple.png', 'Fort_Hateno.png', 'Fural_Plain.png', 'Gama_Cove.png', 'Gatepost_Town_Ruins.png', 'General_Shoppe.png', 'Gero_Pond.png', 'Gerudo_Canyon.png', 'Gerudo_Canyon_Pass.png', 'Gerudo_Canyon_Stable.png', 'Gerudo_Desert_Gateway.png', 'Gerudo_Great_Skeleton.png', 'Gerudo_Secret_Club.png', 'Gerudo_Summit.png', 'Gerudo_Tower.png', "Giant's_Forest.png", 'Ginner_Woods.png', 'Gisa_Crater.png', 'Gleeok_Bridge.png', "Goflam's_Secret_Hot_Spring.png", 'Gogobi_Shores.png', 'Golow_River.png', 'Goponga_Island.png', 'Goponga_Village_Ruins.png', 'Gorko_Lake.png', 'Gorko_Tunnel.png', 'Goronbi_Lake.png', 'Goronbi_Lake_North.png', 'Goronbi_River.png', 'Goron_Gusto_Shop.png', 'Goron_Hot_Springs.png', 'Goro_Cove.png', 'Gortram_Cliff.png', 'Great_Cliffs.png', "Great_Deku_Tree's_Navel.png", 'Great_Fairy_Fountain_Akkala_Highlands.png', 'Great_Fairy_Fountain_Gerudo_Desert.png', 'Great_Fairy_Fountain_Tabantha_Frontier.png', 'Great_Fairy_Fountain_West_Necluda.png', 'Great_Hall.png', 'Great_Zora_Bridge.png', 'Grinnden_Plains.png', "Guards'_Chamber.png", 'Guchini_Plain.png', 'Guchini_Plain_Barrows.png', 'Gut_Check_Rock.png', 'Hammerhead.png', 'Hanu_Pond.png', 'Haran_Lake.png', 'Harfin_Valley.png', 'Harker_Lake.png', 'Hateno_Ancient_Tech_Lab.png', 'Hateno_Bay.png', 'Hateno_Beach.png', 'Hateno_Pasture.png', 'Hateno_Tower.png', 'Hebra_East_Summit.png', 'Hebra_Falls.png', 'Hebra_Great_Skeleton.png', 'Hebra_Headspring.png', 'Hebra_North_Crest.png', 'Hebra_North_Summit.png', 'Hebra_Peak.png', 'Hebra_Plunge.png', 'Hebra_South_Summit.png', 'Hebra_Tower.png', 'Hebra_Trailhead_Lodge.png', 'Hebra_Tundra.png', 'Hebra_West_Summit.png', 'Helmhead_Bridge.png', "Hemaar's_Descent.png", 'Herin_Lake.png', 'Hickaly_Woods.png', 'Highland_Stable.png', 'High_Ground.png', 'High_Spirits_Produce.png', 'Hills_of_Baumer.png', 'Hilltop_High_Road.png', 'Hopper_Pond.png', 'Horon_Lagoon.png', 'Horse_God_Bridge.png', 'Horwell_Bridge.png', 'Hotel_Oasis.png', 'Hylia_Island.png', 'Hylia_River.png', 'Hyrule_Castle_Corridors.png', 'Hyrule_Castle_Courtyard.png', 'Hyrule_Castle_Gate.png', 'Hyrule_Castle_Moat.png', 'Hyrule_Castle_Town_Ruins.png', 'Hyrule_Castle_West.png', 'Hyrule_Cathedral.png', 'Hyrule_Forest_Park.png', 'Hyrule_Garrison_Ruins.png', 'Ibara_Butte.png', 'Icefall_Foothills.png', 'Illumeni_Plateau.png', "Impa's_House.png", 'Inogo_Bridge.png', 'Irch_Plain.png', 'Isle_of_Rabac.png', "Ja'Abu_Ridge.png", 'Jeddo_Bridge.png', 'Jia_Highlands.png', 'Kaepora_Pass.png', 'Kakariko_Bridge.png', 'Kamah_Plateau.png', 'Kanalet_Ridge.png', "Kaneli's_House.png", 'Kara_Kara_Bazaar.png', 'Kara_Kara_Bazaar_Inn.png', 'Karusa_Valley.png', 'Keelay_Plain.png', 'Keya_Pond.png', 'Kincean_Island.png', "King's_Study.png", 'Kitano_Bay.png', 'Kitchen.png', 'Knuckel_Island.png', 'Kochi_Dye_Shop.png', 'Koholit_Rock.png', 'Kolami_Bridge.png', 'Kolami_Bridge_South.png', 'Kolomo_Garrison_Ruins.png', 'Komo_Shoreline.png', 'Kopeeki_Drifts.png', 'Korne_Beach.png', 'Koto_Pond.png', 'Koukot_Plateau.png', 'Koukot_Plateau_Path.png', 'Lakeside_Stable.png', 'Lake_Akkala.png', 'Lake_Darman.png', 'Lake_Ferona.png', 'Lake_Floria.png', 'Lake_Hylia_North.png', 'Lake_Illumeni.png', 'Lake_Intenoch.png', 'Lake_Jarrah.png', 'Lake_Kilsie.png', 'Lake_Kolomo.png', 'Lake_Mekar.png', 'Lake_of_the_Horse_God.png', 'Lake_Saria.png', 'Lake_Siela.png', 'Lake_Sumac.png', 'Lake_Totori.png', 'Lake_Tower.png', 'Lanayru_Bay.png', 'Lanayru_Bluff.png', 'Lanayru_Heights.png', 'Lanayru_Promenade.png', 'Lanayru_Range.png', 'Lanayru_Road_-_East_Gate.png', 'Lanayru_Road_-_West_Gate.png', 'Lanayru_Tower.png', 'Lantern_Falls.png', 'Lantern_Lake.png', 'Laparoh_Mesa.png', 'Laverra_Beach.png', 'Library.png', "Lindor's_Brow.png", 'Linebeck_Island.png', "Link's_House_Renovated.png", 'Little_Twin_Bridge.png', 'Lockup.png', 'Lockup_Back_Room.png', 'Lodrum_Headland.png', 'Lomei_Labyrinth_Island.png', 'Lookout_Post.png', "Lorn's_Fruit_Stand.png", 'Loshlo_Harbor.png', 'Lost_Woods.png', "Lover's_Pond.png", "Ludfo's_Bog.png", 'Lulu_Lake.png', "Luto's_Crossing.png", 'Mabe_Prairie.png', 'Mabe_Village_Ruins.png', 'Mable_Ridge.png', 'Madorna_Mountain.png', 'Malanya_Spring.png', 'Malin_Bay.png', 'Manhala_Bridge.png', 'Mapla_Point.png', 'Marblod_Plain.png', 'Maritta_Exchange_Ruins.png', 'Marot_Mart.png', "Martha's_Landing.png", 'Maw_of_Death_Mountain.png', "Meadela's_Mantle.png", 'Meda_Mountain.png', 'Medingo_Pool.png', 'Mekar_Island.png', "Mellie's_Plum_Garden.png", 'Menoat_River.png', 'Mercay_Island.png', 'Midla_Woods.png', 'Mido_Swamp.png', 'Mikau_Lake.png', 'Military_Training_Camp.png', 'Millennio_Sandbar.png', 'Minshi_Woods.png', 'Moat_Bridge.png', 'Molida_Island.png', 'Moor_Garrison_Ruins.png', 'Mountain_Road.png', 'Mounted_Archery_Camp.png', 'Mount_Agaat.png', 'Mount_Daphnes.png', 'Mount_Drena.png', 'Mount_Dunsel.png', 'Mount_Faloraa.png', 'Mount_Floria.png', 'Mount_Granajh.png', 'Mount_Gustaf.png', 'Mount_Hylia.png', 'Mount_Nabooru.png', 'Mount_Rhoam.png', 'Mount_Rozudo.png', 'Mount_Taran.png', "Mystathi's_Shelf.png", 'N._Tabantha_Snowfield.png', 'Nabi_Lake.png', 'Nautelle_Wetlands.png', 'Naydra_Snowfield.png', 'Nephra_Hill.png', 'Nero_Hill.png', 'Nette_Plateau.png', 'Nima_Plain.png', 'Nirvata_Lake.png', 'Nirvata_Plateau.png', 'Northern_Icehouse.png', 'Northwest_Gate.png', 'North_Akkala_Beach.png', 'North_Akkala_Foothill.png', 'North_Akkala_Valley.png', 'North_Aris_Beach.png', "North_Dragon's_Exile.png", 'North_Hyrule_Castle.png', 'North_Hyrule_Plain.png', 'North_Lomei_Labyrinth.png', 'North_Mable_Ridge.png', "Oakle's_Navel.png", 'Observation_Room.png', "Old_Man's_Cabin.png", "Olkin's_Pumpkins.png", 'Ordorac_Quarry.png', 'Oren_Bridge.png', 'Ore_and_More.png', 'Orsedd_Bridge.png', 'Oseira_Plains.png', 'Outpost_Ruins.png', 'Outskirt_Stable.png', 'Ovli_Plain.png', 'Owlan_Bridge.png', 'Pagos_Woods.png', 'Palmorae_Beach.png', 'Palmorae_Ruins.png', 'Palu_Wasteland.png', 'Pappetto_Grove.png', 'Parache_Plains.png', 'Passeri_Greenbelt.png', 'Passer_Hill.png', 'Peak_of_Awakening.png', 'Phalian_Highlands.png', 'Pico_Pond.png', 'Pierre_Plateau.png', 'Pikida_Stonegrove.png', 'Pillars_of_Levia.png', 'Piper_Ridge.png', 'Ploymus_Mountain.png', "Pondo's_Lodge.png", 'Popla_Foothills.png', "Princess_Zelda's_Room.png", "Princess_Zelda's_Study.png", 'Protein_Palace.png', 'Proxim_Bridge.png', 'Puffer_Beach.png', "Purah's_Room.png", 'Purifier_Lake.png', 'Quarry_Ruins.png', "Quatta's_Shelf.png", 'Rabella_Wetlands.png', 'Rabia_Plain.png', 'Ralis_Pond.png', 'Ranch_Ruins.png', 'Rassla_Lake.png', 'Rauru_Hillside.png', 'Rauru_Settlement_Ruins.png', 'Rayne_Highlands.png', 'Rebonae_Bridge.png', 'Reception_Room.png', 'Regencia_River.png', 'Relationship_Classroom.png', 'Retsam_Forest.png', "Revali's_Landing.png", 'Rhondson_Armor_Boutique.png', 'Ridgeland_Tower.png', "Riju's_Bedroom.png", 'Rikoka_Hills.png', 'Rimba_Beach.png', 'Riola_Spring.png', 'Ripped_and_Shredded.png', 'Risoka_Snowfield.png', 'Rist_Peninsula.png', 'Rito_Stable.png', 'Rito_Village.png', 'Riverside_Stable.png', 'River_of_the_Dead.png', 'Robred_Dropoff.png', 'Rodai_Lake.png', 'Rok_Woods.png', "Rollin'_Inn.png", 'Romani_Plains.png', 'Rospro_Pass.png', 'Round_Spiral_Staircase.png', 'Rowan_Plain.png', 'Royal_Ancient_Lab_Ruins.png', "Royal_Palace's_Throne_Room.png", 'Royal_Palace.png', 'Rutala_Dam.png', 'Rutala_River.png', 'Rutile_Lake.png', 'Rutimala_Hill.png', 'Ruto_Lake.png', 'Ruto_Mountain.png', 'Ruto_Precipice.png', 'S._Tabantha_Snowfield.png', 'Sacred_Ground_Ruins.png', 'Safula_Hill.png', 'Sage_Temple_Ruins.png', 'Sahasra_Slope.png', 'Salari_Hill.png', 'Salari_Plain.png', 'Samasa_Plain.png', 'Sanctum.png', 'Sanctum_Observation_Room.png', 'Sand-Seal_Rally.png', 'Sand-Seal_Rental_Shop_Northwest_Booth.png', 'Sand-Seal_Rental_Shop_Southeast_Booth.png', 'Sanidin_Park_Ruins.png', "Sapphia's_Table.png", 'Sarjon_Bridge.png', 'Sarjon_Woods.png', 'Satori_Mountain.png', "Scout's_Hill.png", 'Seabed_Inn.png', 'Second_Gatehouse.png', "Selmie's_Spot.png", 'Serenne_Stable.png', 'Seres_Scablands.png', 'Shadow_Hamlet_Ruins.png', 'Shadow_Pass.png', 'Shared_Cooking_Space.png', 'Shatterback_Point.png', "Sherfin's_Secret_Hot_Spring.png", 'Shuteye_Inn.png', 'Skull_Lake.png', 'Sleeping_Chamber.png', 'Slippery_Falcon.png', 'Snowfield_Stable.png', 'Soka_Point.png', 'Sokkala_Bridge.png', 'Solewood_Range.png', 'Southeast_Gate.png', 'Southern_Mine.png', 'Southern_Oasis.png', 'Southern_Tal_Tal_Peak.png', 'South_Akkala_Plains.png', 'South_Akkala_Stable.png', 'South_Koukot_Plateau.png', 'South_Lake_Akkala.png', 'South_Lomei_Labyrinth.png', 'South_Nabi_Lake.png', 'South_Taafei_Hill.png', 'Spectacle_Rock.png', 'Spool_Bight.png', 'Spore_Store.png', 'Spring_of_Courage.png', 'Spring_of_Power.png', 'Spring_of_Wisdom.png', 'Squabble_River.png', 'Square_Spiral_Staircase.png', 'Stalry_Plateau.png', 'Starlight_Memories.png', 'Statue_of_the_Eighth_Heroine.png', 'Stinger_Cliffs.png', 'Stolock_Bridge.png', 'Strock_Lake.png', 'Sturnida_Basin.png', 'Sturnida_Secret_Hot_Spring.png', "Swallow's_Roost.png", 'Taafei_Hill.png', 'Tabahl_Woods.png', 'Tabantha_Bridge_Stable.png', 'Tabantha_Great_Bridge.png', 'Tabantha_Hills.png', 'Tabantha_Tower.png', 'Tabantha_Village_Ruins.png', 'Talonto_Peak.png', 'Talus_Plateau.png', 'Tal_Tal_Peak.png', 'Tama_Pond.png', 'Tamio_River.png', 'Tanagar_Canyon.png', 'Tanagar_Canyon_Course.png', 'Taobab_Grassland.png', 'Taran_Pass.png', 'Tarm_Point.png', "Teba's_Home.png", 'Telta_Lake.png', 'Tempest_Gulch.png', 'Temple_of_Time.png', 'Temto_Hill.png', 'Tenoko_Island.png', 'Ternio_Trail.png', 'The_Curious_Quiver.png', 'The_Great_Ton_Pu_Inn.png', 'The_Noble_Canteen.png', 'The_Slippery_Falcon.png', 'Thims_Bridge.png', 'Throne_Room.png', 'Throne_Room_Hyrule_Castle.png', 'Thundra_Plateau.png', 'Thyphlo_Ruins.png', 'Tingel_Island.png', "Tobio's_Hollow.png", 'Torin_Wetland.png', 'Toronbo_Beach.png', 'Toruma_Dunes.png', 'Toto_Lake.png', 'Trilby_Plain.png', 'Trilby_Valley.png', "Trotter's_Downfall.png", 'Tuft_Mountain.png', 'Tumlea_Heights.png', 'Ubota_Point.png', 'Ukuku_Plains.png', 'Ulria_Grotto.png', 'Ulri_Mountain.png', 'Upland_Lindor.png', 'Upland_Zorana.png', 'Uten_Marsh.png', 'Vatorsa_Snowfield.png', 'Vault.png', 'Veiled_Falls.png', 'Ventest_Clothing_Boutique.png', "Village_Chief's_House.png", 'Walnot_Mountain.png', "Warbler's_Nest.png", "Washa's_Bluff.png", 'Wasteland_Tower.png', 'Water_Pump_Room.png', 'Water_Reservoir.png', 'West_Barrens.png', 'West_Castle_Town.png', 'West_Deplian_Badlands.png', 'West_Gerudo_Ruins.png', 'West_Hyrule_Plains.png', 'West_Loshlo_Harbor.png', 'West_Nabi_Lake.png', 'West_Passage.png', 'West_Rospro_Pass.png', "West_Sapphia's_Table.png", 'West_Sokkala_Bridge.png', 'West_Vatorsa_Snowfield.png', 'Wes_Island.png', 'Wetland_Stable.png', 'Whistling_Hill.png', 'Windvane_Meadow.png', 'Wintre_Island.png', 'Woodland_Stable.png', 'Woodland_Tower.png', 'Yambi_Lake.png', 'Yarna_Valley.png', 'Yiga_Clan_Hideout.png', 'Zauz_Island.png', 'Zelkoa_Pond.png', 'Zelo_Pond.png', 'Zirco_Mesa.png', 'Zodobon_Highlands.png', 'Zokassa_Ridge.png', 'Zonai_Ruins.png', "Zora's_Domain_Square.png", 'Zora_River.png'];
                break;
            case 'miscellaneous':
                temp_obj.miscellaneous = ['Classified_Envelope.png', "Daruk's_Protection.png", "Daruk's_Protection_+.png", "Hestu's_Gift.png", "Hestu's_Maracas.png", 'Korok_Seed.png', 'Luminous_Stone_Deposit.png', 'Medal_of_Honor_Hinox.png', 'Medal_of_Honor_Molduga.png', 'Medal_of_Honor_Talus.png', "Medoh's_Emblem.png", "Mipha's_Grace.png", "Mipha's_Grace_+.png", "Naboris's_Emblem.png", 'Ore_Deposit.png', 'Paraglider.png', 'Picture_of_the_Champions.png', 'Rare_Ore_Deposit.png', "Revali's_Gale.png", "Revali's_Gale_+.png", "Rudania's_Emblem.png", "Ruta's_Emblem.png", 'Sheikah_Slate.png', 'Spirit_Orb.png', 'Travel_Medallion.png', 'Treasure_Chest.png', "Urbosa's_Fury.png", "Urbosa's_Fury_+.png"];
                break;
            default:
                break;
        }
    }
    //Creating sugestions object if suggestions are on
    if (suggestions_checked === true) {
        //Creating deep copy of temp_obj values
        suggestions_obj = JSON.stringify(temp_obj);   
        suggestions_obj = JSON.parse(suggestions_obj);
    }
    //Creating game options object keys
    for (let key in temp_obj) {
        game_options[key] = [];
    }
    //Creating game options object values
    let i = 0;
    while (i < img_count) {
        for (let key in temp_obj) {
            if (temp_obj[key].length === 0) break;
            let rand_num = Math.floor(Math.random() * temp_obj[key].length);
            game_options[key].push(temp_obj[key][rand_num]);
            temp_obj[key].splice(rand_num, 1);
            i++;
            if (i >= img_count) break;
        }
    }
    //Checks for empty arrays and removes them
    for (let key in game_options) {
        if (game_options[key].length === 0) delete game_options[key];
    }
}
createGameOptions();

//Turns string into title case
const titleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

//Formats string for suggestions and answers array
const string_format = (str) => {
    if (Object.keys(game_options).length > 0) {
        str = str.split('.');
        str = str[str.length - 2].replace(/_/gi, ' ').trim();
    } else {
        str = random_index.split('/');
        str = str[str.length - 1].split('.');
        str = str[0].replace(/_/gi, ' ').trim();
    }
    return titleCase(str);
}

//Creating suggestions_arr
function createSuggestions() {
    for (let key in suggestions_obj) {
        for (let index in suggestions_obj[key]){
            suggestions_arr.push(string_format(suggestions_obj[key][index]));
        }
    }
}
createSuggestions();

//Updates the images left counter displayed on screen
const update_images_left = () => {
    img_count > 1 ? images_left.innerText = `${img_count} images left` : images_left.innerText = `${img_count} image left`;
    img_count -= 1;
}

//Generates random img paths. It should always get a path from game options and then only get a path from skipped images if only skipped images are left
function genPath(images) {
    //Generates a random img path for game options, if there are any left
    if (Object.keys(game_options).length > 0) {
        random_number1 = Math.floor(Math.random() * Object.keys(images).length);
        random_key = Object.keys(images)[random_number1];
        random_number2 = Math.floor(Math.random() * images[random_key].length);
        random_value = images[random_key][random_number2];
        img_path = `${assets_path}${random_key}/${random_value}`;
        return img_path; 
    //Generates a random img path for skipped images
    } else if (images.length > 0) {
        random_index = images[Math.floor(Math.random() * images.length)];
        return random_index
    }
}

//Deletes img that has been shown or pushes img to skipped images array if user skipped the img
function deleteShown() {
    let index;
    if (Object.keys(game_options).length > 0) {
        index = game_options[random_key].indexOf(random_value);
        for (let i = 0; i < game_options[random_key].length; i++) {
            if (random_value === game_options[random_key][i]) {
                game_options[random_key].splice(index, 1);
            } else {
                continue;
            }
        }
        if (game_options[random_key].length === 0) {
            delete game_options[random_key];
        }
    } else if (skipped_images.length > 0) {
        index = skipped_images.indexOf(random_index);
        skipped_images.splice(index, 1);
    }
}

//Certain categories of images should have different min-widths so they display better
const setWidth = (path) => {
    list = path.split('/');
    if (list[list.length - 2] === 'food') {
        game_img.style.minWidth = '30%';
        game_img.style.minHeight = '30%'
    } else if (list[list.length - 2] === 'materials' || list[list.length - 2] === 'miscellaneous') {
        game_img.style.minHeight = '50%'
    } else if (list[list.length - 2] === 'drip') {
        game_img.style.minWidth = '35%';
        game_img.style.minHeight = '35%'
    } else {
        game_img.style.minHeight = '80%';
    }
}

//Loads first image
function loadFirstImage() {
    game_img.src = genPath(game_options);
    setWidth(game_img.src);
    update_images_left();
}
loadFirstImage();


//Shows a random img from game options object or calls showSkipped() if there are only skipped images left
//If there are no more images left in skipped images or game options, then results() is called
const nextImg = () => {
    if (img_count > 0 || skipped_images.length > 0) {
        if (Object.keys(game_options).length > 0) { 
            game_img.src = genPath(game_options);
            setWidth(game_img.src);
        } else if (skipped_images.length > 0){
            showSkipped();
        } 
        user_input.innerText = ""; 
        setTimeout(() => {
            user_input.focus();
        }, 100);
    } else {
        results();
    }
}

//Shows a random img from the skipped images array
const showSkipped = () => {
    game_img.src = genPath(skipped_images);
    setWidth(game_img.src);
}

//Creates game results
function results() {
    grid_container.style.display = "none";
    document.getElementById('suggestions_container').style.display = 'none';
    game_results.style.display = 'flex';
    enter.disabled = true;
    skip.disabled = true;
    //Creates key-value pair of user input and answers 
    let map = new Map();
    for (let i = 0; i < answers_arr.length; i++) {
        map.set(answers_arr[i], user_input_arr[i]);
    }
    answers_obj = Object.fromEntries(map);
    //Arrow function to execute if user's answer are wrong or right
    const correct_answer = (key) => {
        correct_counter++;
        let div = document.createElement('div');
        game_results.appendChild(div);
        div.innerText = `${answers_obj[key]}`;
        div.style.backgroundColor = 'rgb(173, 247, 208)';
    }
    const wrong_answer = (key) => {
        incorrect_counter++;
        let div = document.createElement('div');
        game_results.appendChild(div);
        div.innerText = `Answer: ${key}\n\nSubmitted Answer: ${answers_obj[key]}`;
        div.style.backgroundColor = 'rgb(253, 204, 204)';
    }
    for (let key in answers_obj) {
        //Checks for secret answers
        if (key === 'Revali') {
            answers_obj[key] === 'Ravioli' || answers_obj[key] === 'Revali' ? correct_answer(key) : wrong_answer(key);
        } else if (key === "Revali's Gale") {
            answers_obj[key] === "Ravioli's Gale" || answers_obj[key] === "Revali's Gale" ? correct_answer(key) : wrong_answer(key);
        } else if (key === "Revali's Gale +") {
            answers_obj[key] === "Ravioli's Gale +" || answers_obj[key] === "Revali's Gale +" ? correct_answer(key) : wrong_answer(key);
        } else {
            //Compares user input to answers
            key === answers_obj[key] ? correct_answer(key) : wrong_answer(key);
        }
    }
    document.getElementById('correct_incorrect').innerText = `You got ${correct_counter} right out of ${correct_counter + incorrect_counter}!\n\n${(correct_counter / (correct_counter + incorrect_counter) * 100).toFixed(2)}%`;
    finish.style.display = 'none';
    save_score.style.display = 'inline-grid';
    show_score.style.display = 'inline-grid';
}

//Pushes answer for img into answers array and pushes user input into user input array
const enter_input = () => {
    //Checks to make sure something is submitted
    if (user_input.innerText.trim() === '') {
        document.getElementById('enter_error').style.display = 'inline';
        setTimeout(() => {
            document.getElementById('enter_error').style.display = 'none';
        }, 3000);
    } else {
        if (Object.keys(game_options).length > 0) {
            answers_arr.push(string_format(random_value));
            
        } else {
            answers_arr.push(string_format(random_index));
        }
        user_input_arr.push(titleCase(user_input.innerText.trim()));
        deleteShown();
        nextImg();
        //Resets suggestion box
        suggestions.innerText = '';
        let div = document.createElement('div');
        div.innerText = 'Suggestions will appear as you start typing';
        suggestions.appendChild(div);
    }
    update_images_left();
}

//Calls enter_input function
enter.addEventListener('click', enter_input);

//Clears text from input field after enter button has been pressed
user_input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        const remove = (str) => {
            return str.replace(/\n|\r/gm, '');
        }
        let str = user_input.innerText;
        user_input.innerHTML = remove(str);
        document.activeElement.blur();
        enter.click();

    }
});

//Pushes img to skipped images array
skip.addEventListener('click', () => {
    if (Object.keys(game_options).length > 0) {
        skipped_images.push(img_path);
        shown_imgs.push(img_path);
        deleteShown();
    }
    nextImg();
});

//Reloads browser, which restarts the game
restart.addEventListener('click', () => {
    window.location.reload();
});

//Brings user back to index page
quit.addEventListener('click', () => {
    window.location = 'index';
});


//Shows scares saved to browser's local storage and changes buttons that are available
show_score.addEventListener('click', () => {
    game_results.style.display = 'none';
    scores_container.style.display = 'flex';
    save_score.style.display = 'none';
    show_score.style.display = 'none';
    clear_scores.style.display = 'inline-grid';
    document.getElementById('show_results').style.display = 'inline-grid';
    let scores_divs = scores_container.querySelectorAll('.scores');
    let no_scores_div = scores_container.querySelectorAll('.no_scores');
    //Fixes issue with the scores appearing and not appearing if you switch between showing scores and game results
    if(show_score_func_call === 0) {
        try {
            if (scores_divs !== null) {
                scores_divs.forEach(scores_divs => {
                    scores_divs.remove();
                });
            }
            if (no_scores_div !== null) {
                no_scores_div.forEach(no_scores_div => {
                    no_scores_div.remove();
                });
            }
            //Tries to retrieve scores from browser's local storage
            let scores_arr = JSON.parse(localStorage.getItem('scores_arr'));
            if (scores_arr === null) {
                let div = document.createElement('div');
                div.innerText = 'There are no saved scores yet. Click on "Save Score" under  Game Results to save your score'
                div.classList.add('no_scores');
                scores_container.appendChild(div);
            } else {
                for (let i = scores_arr.length - 1; i >= 0; i--) {
                    let div = document.createElement('div');
                    div.classList.add('scores');
                    for (let key in scores_arr[i]) {
                        scores_container.appendChild(div);
                        if (div.innerText === '') {
                            div.innerText = `${key} : ${scores_arr[i][key]}`;
                        } else {
                            div.innerText = `${div.innerText}\n${key} : ${scores_arr[i][key]}`;
                        }
                    }
                }
            }
            document.getElementById('retrieve_score_error').style.display = 'none';
       } catch(error) {
            document.getElementById('retrieve_score_error').style.display = 'block';
            document.getElementById('retrieve_score_error').innerText += `\n${error}`;
        }
    }
});

//Saves score to browser's local storage
save_score.addEventListener('click', () => {
    save_score.disabled = true;
    let date = new Date();
    let current_date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    let score_obj = {
        date : current_date,
        score : `${(correct_counter / (correct_counter + incorrect_counter) * 100).toFixed(2)}% of answers were correct (${correct_counter} out of ${correct_counter + incorrect_counter})`
    };
    let scores_arr = JSON.parse(localStorage.getItem('scores_arr'));
    if (scores_arr == null) {
        scores_arr = [];
    }
    scores_arr.push(score_obj);
    localStorage.setItem('scores_arr', JSON.stringify(scores_arr));
    if (show_score_func_call > 0) show_score_func_call = 0;
});

//Clears all scores from browser's local storage
clear_scores.addEventListener('click', () => {
    localStorage.clear();
    let scores = document.getElementsByClassName('scores');
    let no_scores = document.getElementsByClassName('no_scores');
    while (scores.length > 0) {
        scores_container.removeChild(scores[0]);
    }
    if (scores.length === 0 && no_scores.length === 0) {
        let div = document.createElement('div');
        div.innerText = 'There are no saved scores yet. Click on "Save Score" under  Game Results to save your score.'
        div.classList.add('no_scores');
        scores_container.appendChild(div); 
    }
    save_score.disabled = false;
    });

//Displays Results flexbox and changes buttons available
show_results.addEventListener('click', () => {
    scores_container.style.display = 'none';
    game_results.style.display = 'flex';
    save_score.style.display = 'inline-grid';
    show_results.style.display = 'none';
    show_score.style.display = 'inline-grid';
    clear_scores.style.display = 'none';
    show_score_func_call++;
});

//Checks to make sure at least one answer was submitted, then finishes game and calls results function
finish.addEventListener('click', () => {
    if (user_input_arr.length > 0) {
        results();
    } else if (user_input_arr.length === 0) {
        document.getElementById('finish_error').style.display = 'inline';
        setTimeout(() => {
            document.getElementById('finish_error').style.display = 'none';
        }, 3000);
    }
});

//This generates the suggestions after every keyup event
if (suggestions_checked === true) {
    document.getElementById('suggestions_container').style.display = 'block'
    const chars_to_delete = new RegExp(/[^a-z,\u0020, \u00a0, 1-9, [+]]/, 'gi');
    //Resets suggestions after every keyup event besides shift and enter
    user_input.addEventListener('keyup', (event) => {
    if (event.key !== 'Shift' || event.key !== 'Enter') {
        while (suggestions.hasChildNodes()) {
            suggestions.removeChild(suggestions.lastChild);
        }
        //Gets rid of any characters that shouldn't be searched for
        let chars = user_input.innerText.trim();
        chars = chars.replace(chars_to_delete, '');
        //Creates this div if nothing in in user input field
        if (chars.length === 0) {
            let div = document.createElement('div');
            div.innerText = 'Suggestions will appear as you start typing';
            suggestions.appendChild(div);
        } else {
            chars = encodeURIComponent(chars);
            for (let n in suggestions_arr) {
                try {
                    chars = chars.replace(/\u00a0/g, '\u0020'); //Replaces no-break character with a space
                    let regex = new RegExp(chars, 'i');
                    suggestions_arr[n] = suggestions_arr[n].replace(/[+]/g, '%2B'); //Encodes "+"
                    suggestions_arr[n] = suggestions_arr[n].replace(/ /g, '%20'); //Encodes space
                    let result = suggestions_arr[n].match(regex);
                    suggestions_arr[n] = decodeURIComponent(suggestions_arr[n]);
                    //Creates the suggestions divs
                    if (result !== null) {
                        let div = document.createElement('div');
                        div.classList.add('suggestions_div');
                        suggestions.appendChild(div);
                        div.innerText = decodeURIComponent(result.input);
                        div.addEventListener('click', () => {
                            user_input.innerText = div.innerText;
                            user_input.focus();
                        });
                    }
                } catch(error) {
                    let div = document.createElement('div');
                    suggestions.appendChild(div);
                    div.innerText = error.message;
                }
            }
            //Creates this div if no matches were found
            if (!suggestions.hasChildNodes()) {
                let div = document.createElement('div');
                div.innerText = `No suggestions found for "${decodeURIComponent(chars)}"`;
                suggestions.appendChild(div);
            }
        }
    }
    });
}

//This conmtrols turning the audio on/off
let playing = false;
audio_icon.addEventListener('click', () => {
    if (playing === false) {
        playing = true;
        audio.play();
        audio.volume = 1;
        audio_icon.setAttribute('src', 'images/audio_icon_on.png');
    } else if (playing === true) {
        playing = false;
        audio.pause();
        audio_icon.setAttribute('src', 'images/audio_icon_off.png')
    }
});