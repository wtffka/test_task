package com.example.test_task.service;

import com.example.test_task.dto.PhoneBookDto;
import com.example.test_task.model.PhoneBook;

import java.util.List;

public interface PhoneBookService {

    PhoneBook createNewRecord(PhoneBookDto phoneBookDto);

    PhoneBook updateRecord(Long id, PhoneBookDto phoneBookDto);

    List<PhoneBook> updateRecords();

    PhoneBook getRecordById(Long id);
}
