import InputField  from "../components/InputField";
import useInput from "../hooks/useInput";

export default function ResignForm() {
    const [tabungan, setTabungan] = useInput(0); 
    const [skills, setSkills] = useInput('');
    const [telepon, setTelepon] = useInput('');
    const [nama, setNama] = useInput('');
    const [posisi, setPosisi] = useInput('');
    const [departemen, setDepartemen] = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const skillsArray = skills.split(',').map(skill => skill.trim());
        const dataForm = {
        nama: nama,
        telepon: telepon,
        posisi: posisi,
        departemen: departemen,
        tabungan: Number(tabungan),
        skills: skillsArray // e.g. ["React", "Tailwind"]
        };

        console.log("Data siap dikirim:", dataForm);
        // Di sini nanti tempat fungsi Axios untuk menembak API backend misalnya axios.post('/api/resign', dataForm)
    };

    

    return(
        <form onSubmit={handleSubmit}>
            <h1>Resign Form</h1>
            <p>Profile</p>

            <h2>Informasi Pribadi</h2>
            <InputField label="Nama Lengkap" type="text" value={nama} onChange={setNama} />
            <InputField label="No. Telepon" type="text" value={telepon} onChange={setTelepon} />

            <h2>Informasi Pekerjaan</h2>
            <InputField label="Posisi Terakhir" type="text" value={posisi} onChange={setPosisi} />
            <InputField label="Departemen" type="text" value={departemen} onChange={setDepartemen} />
            <InputField label="Total Tabungan(Rp)" type="number"value={tabungan} onChange={setTabungan} />
            <InputField label="Skills" type="text" value={skills} onChange={setSkills}/>
            <button type="submit">Submit</button>
        </form>
    )
}