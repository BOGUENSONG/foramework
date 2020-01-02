package com.foramework.prototype.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

@Controller
public class BaseController {
    @RequestMapping(value = "/")
    public String mainIndex(Model model) throws IOException, SAXException, ParserConfigurationException {
        model.addAttribute("test","테스트 내용"); //index.jsp에 jstl변수 test추가
        return "index"; //index.jsp 맵핑
    }
}
