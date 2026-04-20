import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const supporterMessages = [
    "早日退休", "头发茂密", "天天吃饱", "好运连连", "项目上线顺利",
    "bug 远离", "多睡半小时", "这周不加班", "股票大涨", "基金回本",
    "猫狗双全", "有人请客", "奶茶自由", "方案一次过", "甲方不磨叽",
    "不仅有钱还有闲", "拒绝内卷", "带薪拉屎", "早睡早起", "身体健康",
    "一夜暴富", "发际线坚挺", "不仅脱单还脱贫", "想吃啥吃啥", "体重满减",
    "水逆退散", "诸事顺遂", "心想事成", "财源滚滚", "升职加薪",
    "无论是谁", "都能快乐", "世界和平", "代码无Bug", "需求不变更",
    "服务器不宕机", "不仅能跑还能飞", "产品经理不改需求", "设计稿一次过", "测试不提Bug",
    "老板不画饼", "同事不甩锅", "年终奖翻倍", "体检全通过", "不仅活着还活得好",
    "拥有超能力", "每天自然醒", "做梦都笑醒", "吃不胖", "永远年轻"
];

const names = [
    "李xx", "王汉卿", "Kevin Zhang", "Alice", "Momo", "Ckkkk", "Emma", "Frank", "Grace",
    "张伟", "刘波", "Michael", "John Doe", "Jane Smith", "CryptoKing", "SaaS Builder",
    "IndieHacker", "DesignGuru", "FullStack", "NoCode", "AI Bot", "CyberPunk",
    "ZenMaster", "Foodie", "Traveler", "CatLover", "DogPerson", "CoffeeAddict",
    "TeaDrinker", "Coder", "Hacker", "Maker", "Artist", "Writer", "Musician"
];

async function seed() {
    console.log('Seeding payments...');
    const payments = [];
    for (let i = 0; i < 30; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const message = supporterMessages[Math.floor(Math.random() * supporterMessages.length)];
        const amount = Math.floor(Math.random() * (3000 - 500) + 500); // 500 to 3000 cents

        payments.push({
            stripe_session_id: `seed-${i}-${Date.now()}`,
            amount: amount,
            currency: 'cad',
            display_name: name,
            message,
            is_public: true,
            created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString() // Random past time
        });
    }

    const { error: paymentError } = await supabase.from('payments').insert(payments);
    if (paymentError) {
        console.error('Error seeding payments:', paymentError);
    } else {
        console.log('Payments seeded successfully.');
    }
}

seed();
