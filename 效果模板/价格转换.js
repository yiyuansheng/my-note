 // 计算价格四舍五入方法
       function count (f1, f2) {
            f1 += '';
            f2 += '';

            let f1Len =0;
            let f2Len =0;

            let f1s =f1.split('.');
            if(f1s.length ==2)
            {
                f1Len = f1s[1].length;
            }
            let f2s =f2.split('.');
            if(f2s.length ==2)
            {
                f2Len = f2s[1].length;
            }

            if (f1Len) {
                f1 = f1.replace('.', '');
            }
            if (f2Len) {
                f2 = f2.replace('.', '');
            }
            return f1 * f2 / Math.pow(10, f1Len + f2Len);
        },